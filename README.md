# Ẹtí — Yoruba ASR (DevBlock Technology Limited)

**Ẹtí** ("ear" in Yoruba) is an open-source [Whisper-small](https://huggingface.co/openai/whisper-small)
model fine-tuned for Yoruba automatic speech recognition, published by
**DevBlock Technology Limited** (devblocktechnologies.com).

- **Model (Hugging Face):** [`devblockHQ/eti-yoruba-asr`](https://huggingface.co/devblockHQ/eti-yoruba-asr)
  — transformers + CTranslate2 (faster-whisper) formats.
- **Method:** LoRA (`q_proj` / `v_proj`) on `openai/whisper-small`, merged.
- **License:** MIT.

This repository hosts the model documentation and licensing notes; the model
weights live on Hugging Face.

## Docs

- `docs/model_cards.md` — model card template & registry
- `docs/data_licensing.md` — dataset/model license compliance matrix

## Attribution

Training data includes [IroyinSpeech](https://huggingface.co/datasets/Tundragoon/IroyinSpeech)
(Yoruba news, CC-BY 4.0). Whisper base weights are MIT (OpenAI). Verify
dataset terms before commercial use.

## License

MIT — © 2026 DevBlock Technology Limited.
