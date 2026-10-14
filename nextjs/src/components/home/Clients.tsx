// "Clients" section of the home page (framer-1y3j59): trust line + client logo ticker.
import LogosTicker, { type Logo } from "./LogosTicker";
import s from "./Clients.module.css";

// In Framer's order (layer name, image file in public/framer).
const LOGOS: Logo[] = [
  { name: "Annecto-600x400-1 1", file: "IxbTTaLuLSQAfp1FppnmipKWf2U.png" },
  { name: "Aquamonix Emflux_Logo_Inline_rgb_600px", file: "BPmcbwObWqqOuxKouEAu95CI.png" },
  { name: "Armstrong Biggs_Fallon", file: "sIjsp1sw61jjP8vt6q9UdNBaU7k.png" },
  { name: "Atlantic Group", file: "CsZSwuRV3y43H3rGA7LjgbA7N0.png" },
  { name: "Calix", file: "HaRewDpRe0aKw3CALy4mVmqmF7U.png" },
  { name: "Camp Australia", file: "wx7MqhNXs29pgDTMuAHWbBDtQw.png" },
  { name: "Clean-Power", file: "PPmp0ub303yGaLrKoi5rz4RDMKM.png" },
  { name: "CSIRO", file: "aIhWwXiG6cBqKzVbnRRrum4tvQ4.png" },
  { name: "Dattner Group", file: "x2KMUmAPvzNnkB69nfQ5fawueo.webp" },
  { name: "Dobsons", file: "5wvRTDfkL22OmqWoOMoew4JQdQ.png" },
  { name: "Evolve Housing", file: "d2oOhVSpXeFxZVa8TXSYM6jjiw.png" },
  { name: "Givergy 1", file: "zUl4rUU2ZhPEVTjXU2ouSoh9Q8.png" },
  { name: "Gunn-Agri-Website-logo 1", file: "6vDRXHLkdNjzHBKyl6zhTxjWJc.png" },
  { name: "HVAC", file: "Ol4zRFQx5XzXe6CWjFWIqKBdf4.png" },
  { name: "Johns Lyng_Group", file: "MNcnZ9yQzdKoMFR2mjAsMfVsVx0.png" },
  { name: "LLF-700x500-1 1", file: "losoPMagrBWQKL5ABKOzUviGAU.png" },
  { name: "Logo 32120", file: "SLSf4TzdFtpmLcEtCTVSDfj7Hhs.png" },
  { name: "Logo", file: "mt9c4zY50UZvyJWGJHKzHuRDSw.png" },
  { name: "Medical One", file: "3PwVBxuJ7BsqveLg10Oei95U.png" },
  { name: "Monsu Caulfield", file: "KTC1bJi8sNA8qQJJHDZwRSedQSI.png" },
  { name: "O M_Haircare", file: "SAHXjHo5wTLlV2xtvSS8gJTV3Wg.png" },
  { name: "Patties Foods", file: "VfaUGf2w7tgopK6Hd8BOLjPHQ.png" },
  { name: "Post Windfall_Bio_593eda90f6 1", file: "mV55co6ED561HWk7StFhhpdNcHM.png" },
  { name: "Queensland Government_logo.svg", file: "zHUWLIXaJO7R0MDh2l1WCbUMk.png" },
  { name: "Ray White", file: "OuxyPqin4Qvz4attTh3Mr9gAH1o.png" },
  { name: "Richardson __Wrench", file: "Rqn4elCTSXPEBaJXCrlz6kZpdXA.png" },
  { name: "SLSS LeftLockUp_CMYK", file: "Ea6L5WBS0RkfUmb7DFbGvhKt06s.webp" },
  { name: "Specsavers", file: "PEf1JufM8zW5ncz8D1o331g6Jx4.png" },
  { name: "STORM 1", file: "RvU82gQN8i7qHLtWpZeAsK5Gc4.png" },
  { name: "Strata 1", file: "1NF9Bix2T3bx6Ky9obODLZFdTE.png" },
  { name: "Sutherland Shire_Council", file: "ZpBDrsrGQiMT8sGgMV3qWHEqrK4.png" },
  { name: "The Foyer_Foundation", file: "emo70RKj1ev9q1TOBLT8qX3Rv4.png" },
  { name: "Thinkerbell", file: "lGeTv1sOXWBiPRd1TK89tVE9lX4.png" },
  { name: "Tourism NT", file: "oNKDAku0cqFhL5N48uRmomrk.png" },
  { name: "Tutch", file: "Ioa83Regak0f4oZUJHkaXM21I0.png" },
  { name: "UniLodge", file: "VXhhJgLrtYdkRLuaJ9WJYbrxso.png" },
  { name: "Wirra Wirra", file: "l9I3K8IIrerGgaTnRfhPD8vIuY.png" },
];

export default function Clients() {
  return (
    <section className={s.clients} data-section="Clients" data-framer-name="Clients">
      <div className={s.container} data-framer-name="Container">
        <div className={s.heading} data-framer-name="Heading">
          <p className="p-mzxkxl">100+ growing SMBs across APAC trust OG Labs to transform their operations.</p>
        </div>
        <LogosTicker logos={LOGOS} />
      </div>
    </section>
  );
}
