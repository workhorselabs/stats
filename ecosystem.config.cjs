module.exports = {
  apps: [
    {
      name: "remix-app",
      script: "build/index.js",
      node_args: "-r dotenv/config",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
