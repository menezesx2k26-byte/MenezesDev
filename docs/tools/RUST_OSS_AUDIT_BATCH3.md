# MenezesDev Tools — Rust-first OSS Audit, Batch 3

**Date:** 2026-08-24  
**Scope:** barcode/QR decode, YAML and parser-maintenance risk.  
**Governing policy:** `docs/tools/SECURITY_POLICY.md`.

## Decisions

| Candidate | Capability | License | Audit finding | Decision |
|---|---|---|---|---|
| `rxing-core/rxing` | QR + barcode encode/decode | Apache-2.0 | Pure-Rust hand port of ZXing/ZXing-C++; supports QR, Data Matrix, Aztec, PDF417, Code 39/93/128, EAN/UPC and more; WASM path exists. Positive tests are ported, but upstream states negative verification tests are not yet implemented. | **CONDITIONAL — preferred decode candidate, hostile-image regression/fuzz gate required** |
| `wg/quirc-rs` | QR decode | ISC | Rust wrapper around bundled C `quirc`; requires C compiler; tiny community. Does not provide the memory-safety benefit expected from Rust-first parsing. | **HOLD** |
| `Ethiraric/yaml-rust2` | YAML 1.2 parse/emit | MIT OR Apache-2.0 | Pure Rust, YAML test-suite compliance, explicitly does not instantiate arbitrary types. However upstream states it is now basic-maintenance/stable-API only and directs evolving users to `saphyr`. | **CONDITIONAL / HOLD for new default** — evaluate `saphyr` before selection |
| `dtolnay/serde-yaml` | YAML + Serde | MIT OR Apache-2.0 | Repository archived March 2024; maintainer explicitly states no further releases planned. Depends on `unsafe-libyaml`. | **REJECT for new integration** |
| `sebastienrousseau/serde_yml` | YAML + Serde fork | MIT OR Apache-2.0 | Archived September 2025. | **REJECT for new integration** |
| `yaml/yaml-serde` | YAML + Serde maintained fork | MIT OR Apache-2.0 | Active replacement candidate for deprecated `serde_yaml`; still needs an exact unsafe/FFI/transitive security review before approval. | **CONDITIONAL — investigate** |

## QR/barcode recommendation

`rxing` is currently the strongest Rust-first candidate for **decoding**, because unlike `quirc-rs` it does not hand the hostile image/parsing core to bundled C. It is not yet `APPROVED`, because the upstream README explicitly says negative verification tests are not yet implemented.

Before integration it must pass our own corpus covering:

- malformed QR finder patterns;
- truncated/corrupt raster inputs;
- extreme image dimensions and pixel caps;
- multi-code images;
- adversarial/noise-heavy images;
- unsupported symbologies;
- decoder timeout/work budget;
- randomized/fuzz-generated inputs.

For **generation**, `qrcodegen` remains the simpler approved candidate when QR-only output is enough.

## YAML recommendation

YAML is treated as a higher-risk structured-input format because aliases, nesting and large scalar/collection structures can create resource-exhaustion problems even in memory-safe code.

Rules for any YAML tool:

1. input byte cap before parsing;
2. nesting/depth cap where parser API permits;
3. alias/anchor expansion work cap;
4. collection/scalar size caps;
5. no custom object/type instantiation from YAML tags;
6. no network/resource loading;
7. serialization from an internal typed tree, never pass-through execution;
8. malformed/bomb fixtures in CI.

`serde_yaml` and `serde_yml` are explicitly excluded for new MenezesDev Tools code because both upstream repositories are archived. `yaml-rust2` is memory-safe/pure-Rust but only basic-maintenance; the audit should evaluate `saphyr` and `yaml/yaml-serde` before freezing a YAML engine.

## Supply-chain rule reinforced by this batch

A popular historical crate is not acceptable merely because it is well-known. Archived/deprecated parser dependencies are rejected for **new** integration unless there is no viable maintained alternative and a separate exception review is approved.
