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

    const resultKey = await supabase
      .from("Key")
      .select("id")
      .eq("Key", key)
      .maybeSingle();

    if (resultKey.error) {
      return res.status(500).json({
        valid: false,
        message: "Erro do Supabase",
        detalhes: resultKey.error.message,
        codigo: resultKey.error.code,
        detalhes_extra: resultKey.error.details,
        dica: resultKey.error.hint
      });
    }

    if (resultKey.data) {
      return res.status(200).json({
        valid: true,
        message: "Key válida"
      });
    }

    const resultTeste = await supabase
      .from("Key")
      .select("id")
      .eq("teste", key)
      .maybeSingle();

    if (resultTeste.error) {
      return res.status(500).json({
        valid: false,
        message: "Erro do Supabase",
        detalhes: resultTeste.error.message,
        codigo: resultTeste.error.code,
        detalhes_extra: resultTeste.error.details,
        dica: resultTeste.error.hint
      });
    }

    if (resultTeste.data) {
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
