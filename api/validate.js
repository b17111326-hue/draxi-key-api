import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      valid: false,
      message: "Método não permitido"
    });
  }

  const { key } = req.body || {};

  if (!key) {
    return res.status(400).json({
      valid: false,
      message: "Key não informada"
    });
  }

  const { data, error } = await supabase
    .from("Key")
    .select("id")
    .eq("Key", Key)
    .maybeSingle();

  if (error) {
    return res.status(500).json({
      valid: false,
      message: "Erro ao consultar a Key"
    });
  }

  if (!data) {
    return res.status(401).json({
      valid: false,
      message: "Key inválida"
    });
  }

  return res.status(200).json({
    valid: true,
    message: "Key válida"
  });
}
