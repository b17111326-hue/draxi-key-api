export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ valid: false });
  }

  const { key } = req.body || {};

  if (!key) {
    return res.status(400).json({
      valid: false,
      message: "Key não informada"
    });
  }

  return res.status(200).json({
    valid: true,
    message: "API funcionando"
  });
}
