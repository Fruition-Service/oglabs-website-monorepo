// "Stats Card" (Framer component framer-mvhg0, variant "Default — Logo Visible"): number (preset
// 1e9p27t), description (knz921) and the optional round OG Labs badge hanging off the bottom-right
// corner. The page toggles the badge per breakpoint (prop "Icon", SFGib7bmB), hence `logo`.
import shared from "../shared.module.css";
import { CARD_LOGO_PATH } from "./assets";
import s from "./StatsCard.module.css";

export type LogoAt = { desktop: boolean; tablet: boolean; phone: boolean };

export default function StatsCard({ number, description, logo }: { number: string; description: string; logo: LogoAt }) {
  const logoCls = [s.logo, !logo.desktop && s.offD, !logo.tablet && s.offT, !logo.phone && s.offP].filter(Boolean).join(" ");
  const anyLogo = logo.desktop || logo.tablet || logo.phone;
  return (
    <div className={`${s.card} ${shared.border}`} data-framer-name="Default — Logo Visible">
      <div className={s.number}>
        <p className="p-1e9p27t">{number}</p>
      </div>
      <div className={s.description}>
        <p className="p-knz921">{description}</p>
      </div>
      {anyLogo && (
        <div className={logoCls} data-framer-name="Logo">
          <svg className={s.logoSvg} viewBox="0 0 42 41" overflow="visible" role="presentation" aria-hidden="true">
            <path d={CARD_LOGO_PATH} fill="var(--token-a9ada049-76e9-4f1f-8c74-adc974e9300d, rgb(255, 255, 255))" />
          </svg>
        </div>
      )}
    </div>
  );
}
