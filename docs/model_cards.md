# Model Cards — Template & Registry

**Status:** template v1. One card per shipped adapter version, stored in
`checkpoints/adapters/<kind>/<lang>/<version>/model_card.md` and registered
in `adapter_registry.py` (§12).

---

## Template

```markdown
# Model Card: <voice_id | adapter_id>
Version: <vX> · Date: <YYYY-MM-DD>

## Base & architecture
- Base checkpoint, adapter type (LoRA rank/alpha), license (docs/data_licensing.md)

## Training data
- Hours, speakers, accent regions, sources, consent status, cleaning version
- Held-out data: <golden set version>

## Evaluation (gates, docs/evaluation_protocol.md)
| Metric | Score | Gate | Pass |
| ASR WER (API) | ... | ≤0.20 | ✅/❌ |
| ASR WER (telephony) | ... | ≤0.28 | |
| TTS MOS (API) | ... | ≥4.2 | |
| TTS MOS (telephony) | ... | ≥3.5 | |
| Accent authenticity | ... | ≥3.5 | |
| RTF / latency (§20.3) | ... | gate | |

## Known limitations
- Accents underrepresented, code-switch degradation, tonal errors, noise sensitivity

## Ethical & safety considerations
- Consent status of all data; no NC-licensed data; tested for injection resistance
- Human reviewer sign-off: <name, date>

## Usage
- Intended use: conversational voice agent via API (§§5, 8)
- Out of scope: impersonation, minors without guardian consent
```

## Example (placeholder — filled at M2)

| Field | Example value |
|---|---|
| Adapter | `asr/swa/v0.1` |
| Base | Whisper large-v3 or MMS-1B (ADR-0003 pending) |
| Data | 30h clean Swahili (mix), consented |
| WER API | TBD |
| Sign-off | Native reviewer, M2 gate |

## Ẹtí — ASR Yoruba v0.2 (shipped prototype)

| Field | Value |
|---|---|
| Adapter | `eti-yoruba-ct2` (dir `mvp/models/eti-yoruba-ct2`), a.k.a. `whisper-small-yoruba-v0.2` |
| Base | `openai/whisper-small`, LoRA r16 α32 on `q_proj`/`v_proj` (0.73% trainable) |
| Data | ~25h single-narrator Yoruba Bible (7,491 train / 63 dev / 40 test), 48k FLAC |
| License | Bible corpus CC BY-NC-SA (probable) — **prototype-only**, see data_licensing.md |
| Eval (40 held-out clips, seed 42) | WER **0.557** raw / **0.473** no-diacritics; base whisper-small = **1.031** / 1.000 |
| Backend | faster-whisper, CTranslate2 int8 (248MB model.bin) |
| Name | **Ẹtí** ("ear") — ASR = Ẹtí, TTS voices see docs/voices.md |

### Known limitations
- Trained on read scripture → Bible-style WER is a ceiling; conversational
  Yoruba scores worse. Retrain on news/conversational data for v2 (Iroyin +
  WAXAL wired into `train/train_yoruba_asr.ipynb`).
- Now emits tone-marked Yoruba (data was tone-marked) — verify TTS/LLM
  handling of diacritics in the live agent.

### Training recipe
Pinned `transformers==4.44.2 peft==0.12.0`; `patch_peft_for_whisper()`
monkeypatch (drops peft-injected `input_ids`/`inputs_embeds`); no gradient
checkpointing; crash-proof checkpointing to Drive + `--resume`
(docs/colab_training.md).

## Rules
- No adapter ships without a card + passing gate rows.
- Cards are immutable per version; a new version = a new card (never
  overwrite, per ADR policy).
