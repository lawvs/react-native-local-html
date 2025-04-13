/*
 * If you add an asset you need to run `npx expo prebuild`
 * If you rename or delete an asset you need to run `npx expo prebuild --clean` to delete them in your android and ios folder as well.
 *
 * This plugin is inspired by the following plugins:
 * - [expo-custom-assets](https://github.com/Malaa-tech/expo-custom-assets)
 * - [spacedrive](https://github.com/spacedriveapp/spacedrive/blob/main/apps/mobile/scripts/withRiveAssets.js)
 */

const {
  withDangerousMod,
  withXcodeProject,
  IOSConfig,
} = require("@expo/config-plugins");
const fs = require("node:fs");
const path = require("node:path");

const IOS_GROUP_NAME = "Assets";

const isAssetReady = (assetsPath) => {
  return fs.existsSync(assetsPath);
};

const withAssets = (config, props) => {
  if (!isAssetReady(props.assetsPath)) {
    throw new Error(
      `Assets source directory not found! path: ${props.assetsPath}`
    );
  }
  const configAfterAndroid = addAndroidResources(config, props);
  const configAfterIos = addIOSResources(configAfterAndroid, props);
  return configAfterIos;
};

// Code inspired by https://github.com/rive-app/rive-react-native/issues/185#issuecomment-1593396573
function addAndroidResources(config, { assetsPath }) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      // Get the path to the Android project directory
      const { projectRoot } = config.modRequest;

      // Get the path to the Android resources directory
      const resDir = path.join(projectRoot, "android", "app", "src", "main");

      // Create the 'assets' directory if it doesn't exist
      const rawDir = path.join(resDir, "assets");
      fs.mkdirSync(rawDir, { recursive: true });

      // Retrieve all files in the assets directory
      // const assetFiles = fs.readdirSync(assetSourcePath)

      // Move asset file to the resources 'raw' directory
      const assetsBaseName = path.basename(assetsPath);
      const targetDir = path.join(rawDir, assetsBaseName);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.cpSync(assetsPath, targetDir, { recursive: true });

      // Move each asset file to the resources 'raw' directory
      // for (const assetFile of assetFiles) {
      //   const srcAssetPath = path.join(assetSourcePath, assetFile)
      //   const destAssetPath = path.join(rawDir, assetFile)
      //   fs.copyFileSync(srcAssetPath, destAssetPath)
      // }

      // Access the resources directory by using `file:///android_asset/FILENAME`
      return config;
    },
  ]);
}

// Code inspired by https://github.com/expo/expo/blob/61f8cf8d4b3cf5f8bf61f346476ebdb4aff40545/packages/expo-font/plugin/src/withFontsIos.ts
function addIOSResources(config, { assetsPath }) {
  return withXcodeProject(config, async (config) => {
    const project = config.modResults;
    const { platformProjectRoot } = config.modRequest;

    // Create Assets group in project
    IOSConfig.XcodeUtils.ensureGroupRecursively(project, IOS_GROUP_NAME);

    // Add assets to group
    addIOSResourceFile(project, platformProjectRoot, [assetsPath]);

    return config;
  });

  function addIOSResourceFile(project, platformRoot, assetFilesPaths) {
    for (const assetFile of assetFilesPaths) {
      const filePath = path.relative(platformRoot, assetFile);
      IOSConfig.XcodeUtils.addResourceFileToGroup({
        filepath: filePath,
        groupName: IOS_GROUP_NAME,
        project,
        isBuildFile: true,
        verbose: true,
      });
    }
  }
}

module.exports = withAssets;
