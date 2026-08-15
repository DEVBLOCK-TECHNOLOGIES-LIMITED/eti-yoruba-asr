# Ẹtí — Open Yoruba ASR

**Ẹtí** (Yoruba: *ẹtí*, "ear") is an open-source
[Whisper-small](https://huggingface.co/openai/whisper-small) model fine-tuned
for **Yoruba automatic speech recognition**, published by
**DevBlock Technology Limited** ([devblocktechnologies.com](https://devblocktechnologies.com)).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Model on Hugging Face](https://img.shields.io/badge/🤗%20Hugging%20Face-devblockHQ%2Feti--yoruba--asr-blue)](https://huggingface.co/devblockHQ/eti-yoruba-asr)

Yoruba (~50M speakers) has limited commercial ASR coverage. Ẹtí is an openly
licensed baseline — including a CPU-friendly CTranslate2 build for edge and
low-cost serving.

---

## Model summary

| | |
|---|---|
| **Base** | [`openai/whisper-small`](https://huggingface.co/openai/whisper-small) (MIT) |
| **Adaptation** | LoRA on `q_proj`/`v_proj` (r=16, α=32), merged |
| **Language** | Yoruba (`yo`) |
| **Formats** | Transformers + CTranslate2 / faster-whisper |
| **License** | MIT |

**Model (Hugging Face):** [`devblockHQ/eti-yoruba-asr`](https://huggingface.co/devblockHQ/eti-yoruba-asr)

## Evaluation (WER, held-out, lower = better)

| Set | n | Raw | No-diacritics |
|---|---|---|---|
| Read speech (base-corpus test) | 40 | 0.557 | 0.473 |
| Conversational (`thisniyi/yoruba-speech-project-v2`) | 50 | 1.087 | 0.822 |

Conversational Yoruba is far harder than read/news speech — the gap is the
main signal for where the model needs more conversational training data.
Production target (not yet met): WER ≤ 0.20 API / ≤ 0.28 telephony.

## Quickstart

Transformers:

```python
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import librosa

repo = "devblockHQ/eti-yoruba-asr"
model = WhisperForConditionalGeneration.from_pretrained(repo)
proc = WhisperProcessor.from_pretrained(repo, language="yoruba", task="transcribe")
audio, sr = librosa.load("clip.wav", sr=16000, mono=True)
feats = proc(audio=audio, sampling_rate=16000, return_tensors="pt").input_features
print(proc.batch_decode(model.generate(feats, language="yoruba", task="transcribe"),
                        skip_special_tokens=True)[0])
```

faster-whisper (CPU-friendly CT2):

```python
from faster_whisper import WhisperModel
m = WhisperModel("devblockHQ/eti-yoruba-asr/ct2", device="cpu", compute_type="int8")
print(" ".join(s.text for s in m.transcribe("clip.wav", language="yo", beam_size=5)[0]))
```

## Repository layout

```
docs/model_cards.md    model card template & registry
docs/data_licensing.md dataset/model license compliance matrix
```

The training pipeline and WER benchmark are maintained internally; the
weights are the open-source artifact published here and on Hugging Face.

## Attribution & licensing

- Training data includes [IroyinSpeech](https://huggingface.co/datasets/Tundragoon/IroyinSpeech)
  (Yoruba news, **CC-BY 4.0**) and a capped WAXAL sample.
- Whisper base weights © OpenAI, MIT.
- ⚠️ Verify base-corpus / WAXAL terms before commercial use (`docs/data_licensing.md`).

## License

MIT — © 2026 DevBlock Technology Limited.
