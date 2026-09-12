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

  try {
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
      .eq("teste", key)
      .limit(1);

    if (error) {
      return res.status(500).json({
        valid: false,
        message: "Erro no Supabase",
        detalhes: error.message,
        codigo: error.code,
        dica: error.hint || "Sem dica"
      });
    }

    if (data && data.length > 0) {
      return res.status(200).json({
        valid: true,
        message: "Key válida"
      });
    }

    return res.status(401).json({
      valid: false,
      message: "Key não encontrada"
    });

  } catch (error) {
    return res.status(500).json({
      valid: false,
      message: "Erro interno",
      detalhes: error.message
    });
  }
}
