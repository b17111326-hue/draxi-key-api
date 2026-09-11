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

    // Procura a Key na coluna "Key"
    const resultKey = await supabase
      .from("Key")
      .select("id")
      .eq("Key", key)
      .maybeSingle();

    // Se encontrou na coluna Key
    if (resultKey.data) {
      return res.status(200).json({
        valid: true,
        message: "Key válida pela coluna Key"
      });
    }

    // Procura também na coluna "teste"
    const resultTeste = await supabase
      .from("Key")
      .select("id")
      .eq("teste", key)
      .maybeSingle();

    // Se encontrou na coluna teste
    if (resultTeste.data) {
      return res.status(200).json({
        valid: true,
        message: "Key válida pela coluna teste"
      });
    }

    // Mostra qualquer erro do Supabase
    if (resultKey.error || resultTeste.error) {
      return res.status(500).json({
        valid: false,
        message: "Erro do Supabase",
        erroKey: resultKey.error?.message || null,
        erroTeste: resultTeste.error?.message || null
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
      error: error.message
    });
  }
}
