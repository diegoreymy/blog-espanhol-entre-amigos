module.exports = async (req, res) => {
  const mod = await import('../dist/espanhol-entre-amigos/server/main.server.mjs');
  return mod.default(req, res);
};
