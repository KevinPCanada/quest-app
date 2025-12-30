export default async (req, res) => {
  // Load app dynamically
  const { default: app } = await import('../server/main.js');
  
  // Pass the request and response to Express app
  app(req, res);
};