const { gemini, llama, meta } = require("../function/ai");

exports.enhance = async (req, res) => {
  const { original, useCase, tone, format, model } = req.body;
  console.log(":hey");
  try {
    const text = await llama(original, useCase, tone);
    console.log(text);
    res.status(200).json({ message: "User added successfully", text: text });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
