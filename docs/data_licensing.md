# Dataset & Model License Compliance Matrix

**Status:** DRAFT — every ⚠️ entry MUST be verified against the source's
current license terms at ingestion time, before the data touches a training
run that will ship commercially. Licenses change; this matrix is a
checklist, not legal advice.

**Legend:** ✅ commercial-ok · ❌ non-commercial only · ⚠️ verify before use

---

## 1. Speech corpora (bootstrap sources, ARCHITECTURE §5.6/§6.1)

| Dataset | License | Verdict | Notes |
|---|---|---|---|
| Common Voice (any language) | CC0 | ✅ | Public domain; safest large source. QC heavy. |
| IroyinSpeech (Yoruba news; Kaggle / `Tundragoon/IroyinSpeech`) | CC-BY 4.0 | ✅ | Verified. Yoruba news speech (~5h validated), Common Voice format. |
| MMS checkpoints (ASR/TTS/LID) | CC-BY-NC 4.0 | ❌ | Non-commercial. Phase 0 validation only; never ship weights (§14.3, §21). |
| BibleTTS | ⚠️ CC BY-NC-SA 4.0 (per-split variations reported) | ⚠️→❌ likely | Scripture-read audio: flat prosody (§14.2) + NC restriction. Eval/bootstrap only. |
| WAXAL | ⚠️ verify per collection | ⚠️ | Confirm terms per language subset before any commercial run. |
| Masakhane HF collections | ⚠️ varies per dataset (CC-BY, CC-BY-NC, custom) | ⚠️ | Filter per dataset in `dataset_registry.py`; NC subsets → eval only. |
| Gamayun | ⚠️ verify | ⚠️ | Confirm redistribution/commercial terms. |
| Yoruba Speech Corpus (OpenSLR-86) | ⚠️ reported CC BY-NC-SA 4.0 | ⚠️→❌ likely | Bible-derived; see BibleTTS note. |
| Digital Umuganda Kinyarwanda sets | ⚠️ custom terms | ⚠️ | Direct agreement may be required. |
| AfriSpeech | ⚠️ verify (reported CC-BY-NC-SA 4.0) | ⚠️→❌ likely | Medical-domain ASR eval data. |
| Commissioned recordings (§14.5) | Signed speaker release | ✅ | See `speaker_release_template.md`; consent tracked per clip (§6.2). |
| Production flywheel (§5.6) | User consent (`ConsentStatus`) | ✅ if consented | Enforced at ingestion boundary (§10), never by convention. |

## 2. Model checkpoints (bases + tooling)

| Model | License | Verdict | Notes |
|---|---|---|---|
| Whisper (OpenAI) | MIT (code + released weights) | ✅ | Verify exact checkpoint terms at download. |
| MMS / mms-1b-all, mms-lid | CC-BY-NC 4.0 | ❌ | See §21 risk row. |
| CosyVoice 2 (FunAudioLLM) | Apache 2.0 | ✅ | Strong TTS candidate (§14.3). |
| F5-TTS | MIT (code); **weights CC-BY-NC** (Emilia) | ⚠️→❌ | Strong TTS candidate (§14.3) but pretrained weights are non-commercial — retrain on CC data before shipping. |
| StyleTTS2 | ⚠️ MIT code; verify weight license | ⚠️ | Fast-tier candidate (§20.2). |
| MaskGCT (Amphion) | ⚠️ MIT (Amphion); verify weights | ⚠️ | Also fails T4 training (§5.7). |
| Silero VAD | ⚠️ MIT; verify commercial terms | ⚠️ | Default VAD (§5.5.1). |
| Whisper / MMS serving via transformers | per-model | — | Serving framework licensing checked separately at §22.2 decision. |

## 3. Rules

1. **No dataset enters a commercial training run without a verified license
   row above**, recorded against the dataset version in
   `dataset_registry.py` (§6.2).
2. **NC-licensed data is internal-only**: feasibility, evaluation, and
   Phase 0 pipeline validation. Never used in shipped adapters.
3. **The MMS restriction is structural**, not incidental: it is why §14.3
   mandates a flow/diffusion base for production voices and why §21 lists
   the swap as a first-class mitigation.
4. License verification is part of `scripts/onboard_language.py` — the
   language onboarding script refuses to proceed until the matrix has a
   verified row for every source in `configs/languages/<lang>.yaml`.
