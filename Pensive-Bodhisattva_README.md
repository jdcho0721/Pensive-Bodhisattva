# 반가사유상: 사유의 목소리
### The Voice of Contemplation — Pensive Bodhisattva

<p align="center">
  <img src="https://img.shields.io/badge/WCAG-2.1%20AA-4CAF50?style=flat-square" alt="WCAG 2.1 AA">
  <img src="https://img.shields.io/badge/PWA-Offline%20Ready-5A67D8?style=flat-square" alt="PWA">
  <img src="https://img.shields.io/badge/License-MIT-A07840?style=flat-square" alt="MIT License">
  <img src="https://img.shields.io/badge/Humartology-Lab-1A362D?style=flat-square" alt="Humartology Lab">
</p>

<p align="center">
  <b>국보 반가사유상의 깊은 명상과 사유를 디지털 인터페이스로 시각화하고 청각화한 작품</b><br>
  <i>A work that visualizes and sonifies the profound meditation of Korea's National Treasure Pensive Bodhisattva</i>
</p>

---

## 프로젝트 소개 / Overview

**반가사유상: 사유의 목소리**는 국보 제83호 반가사유상이 지닌 깊은 명상과 사유의 상태를 디지털 인터페이스로 재해석한 작품입니다. 관람객은 상(像)의 세 주요 부위를 인터랙션하며, 각 신체에 담긴 철학적 의미와 영성을 청각으로 체감합니다. 시각장애인이 '보는' 것이 아닌 '듣고 느끼는' 방식으로 유물의 정신에 닿을 수 있도록 설계되었습니다.

*The Voice of Contemplation* reinterprets the meditative state of Korea's National Treasure Pensive Bodhisattva through a digital interface. Visitors interact with three key areas of the statue, experiencing the philosophical meaning and spirituality of each through sound. Designed so that visually impaired visitors can reach the spirit of the artifact through hearing and feeling, rather than seeing.

> **"시각 너머에 존재하는 사유의 상태를 청각으로 체감합니다."**

---

## 주요 기능 / Features

### 🖱️ 인터랙션 / Interaction
- 화면 속 반가사유상의 **세 가지 주요 부위** 클릭/터치 인터랙션
- 커서 진입 시 스크린 리더 및 전용 사운드 해설 자동 출력
- 단계별 시나리오 구조 — 만남(Encounter) → 사유(Contemplation) → 깨달음(Enlightenment)

### 🔊 사운드 해설 / Audio Narration
- 각 신체 부위(손, 발, 얼굴)에 담긴 깊은 철학적 의미와 영성 전달
- 전용 사운드 디자인으로 사유의 깊이를 청각화
- Web Speech API 기반 한국어 내레이션

### ♿ 접근성 / Accessibility
- **WCAG 2.1 AA** 준수
- **TalkBack / VoiceOver** 완벽 지원 — 스크린 리더와 완전 호환
- 시각 없이 유물의 철학적 의미를 온전히 경험 가능

---

## 작품 배경 / Background

반가사유상(半跏思惟像)은 한쪽 다리를 내리고 손가락을 뺨에 댄 채 사유하는 보살상으로, 삼국시대 한국 불교 조각의 정수입니다. 이 작품은 그 침묵의 사유를 디지털의 목소리로 깨웁니다.

The Pensive Bodhisattva, with one leg pendant and fingers touching the cheek in contemplation, is the pinnacle of Three Kingdoms-era Korean Buddhist sculpture. This work awakens its silent contemplation into a digital voice.

---

## 시나리오 구조 / Scenario Structure

```
시나리오 1: 탄생과 소명  →  시나리오 2: 질문과 조우  →  시나리오 3: 깨달음과 침묵
     (Birth & Calling)           (Question & Encounter)        (Enlightenment & Silence)
```

---

## 실행 방법 / Getting Started

```bash
git clone https://github.com/jdcho0721/Pensive-Bodhisattva.git
cd Pensive-Bodhisattva
npx serve .
# http://localhost:3000
```

**라이브 데모 / Live Demo:**  
🔗 [jdcho0721.github.io/Pensive-Bodhisattva/](https://jdcho0721.github.io/Pensive-Bodhisattva/)

---

## 기술 스택 / Tech Stack

| 분류 | 기술 |
|------|------|
| 프론트엔드 | Vanilla HTML / CSS / JavaScript |
| 오디오 | Web Audio API, Web Speech API |
| 인터랙션 | CSS Hover / Touch Events |
| PWA | Service Worker, Web App Manifest |
| 접근성 | WAI-ARIA, WCAG 2.1 AA |

---

## Mobile Tactile Museum 전시 / Exhibition

이 작품은 **Mobile Tactile Museum (이동 촉각 뮤지엄)** 전시의 **Work 02 — Philosophy & Voice**입니다.

| # | 작품 | 링크 |
|---|------|------|
| 01 | 오우가와 세연정: 공간의 교향곡 | [Seyeon](https://github.com/jdcho0721/Seyeon) |
| 02 | **반가사유상: 사유의 목소리** | 현재 저장소 |
| 03 | 감각의 고고학 2076: 잃어버린 향의 연대기 | [Incense-Burner](https://github.com/jdcho0721/Incense-Burner) |
| 04 | 전북맹아학교를 위한 촉각 음성 졸업 앨범 | [Relay-of-memories](https://github.com/jdcho0721/Relay-of-memories) |
| 05 | 에밀레: 천년의 울림 | [Emille-Bell](https://github.com/jdcho0721/Emille-Bell) |

---

## 제작진 / Credits

| 역할 | 이름 | 소속 |
|------|------|------|
| Exhibition Creator & Multisensory Interaction Director | **조준동 (Cho Jundong)** | 성균관대학교 정보통신대학 명예교수 · Humartology Lab 설립자 |
| Virtual Archaeology & Tactile Production Director | **김호용** | (주)위프코 대표 |
| Accessibility Consultant & Barrier-Free Supervisor | **육근해** | 장애인문화복지연구소 대표 |

✉ jdcho@skku.edu · 🌐 [blog.naver.com/humartology](https://blog.naver.com/humartology)

---

## 라이선스 / License

[MIT License](./LICENSE) — © 2026 조준동 · Humartology Lab

> 반가사유상 이미지는 국립중앙박물관 소장품으로, 별도의 저작권 규정이 적용됩니다.  
> *The Pensive Bodhisattva image is housed at the National Museum of Korea; separate copyright regulations apply.*

<p align="center"><i>Mobile Tactile Museum — 이동 촉각 뮤지엄 · 2026</i></p>
