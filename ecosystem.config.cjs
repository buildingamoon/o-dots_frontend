module.exports = {
  apps: [
    {
      name: 'o-dotsfrontend',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: '/home/O-dots/frontend/.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        BASE_URL: 'https://o-dots.com'
      },
      env_development: {
        NODE_ENV: 'development',
        BASE_URL: 'http://localhost:3000'
      }
    },
    {
      name: 'o-dotsfrontend-dev',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ]
};
