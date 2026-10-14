// "Elements/Reviews" (component w51jr): five orange star tiles and a mono caption on a grey card.
import { STAR_SVG } from "./art";
import s from "./Reviews.module.css";

// Inline (not a data URL) so the fill can use the colour token.
const STAR = STAR_SVG.replace("<svg ", '<svg style="width:100%;height:100%;display:block" ');

export default function Reviews() {
  return (
    <div className={s.card} data-framer-name="Default">
      <div className={s.stars} data-framer-name="Stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={s.star} data-framer-name="Star">
            <div className={s.starArt} dangerouslySetInnerHTML={{ __html: STAR }} />
          </div>
        ))}
      </div>
      <div className={s.caption}>
        <p className="p-foxgst">Trusted by 100+ APAC SMBs</p>
      </div>
    </div>
  );
}
