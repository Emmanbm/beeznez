/**
 * Calcule le temps total en millisecondes à partir d'un objet de durées.
 *
 * @param totalTime - Un objet contenant les durées en secondes, minutes, heures et jours.
 *   - `s` : secondes (optionnel, défaut = 0)
 *   - `m` : minutes (optionnel, défaut = 0)
 *   - `h` : heures (optionnel, défaut = 6)
 *   - `d` : jours (optionnel, défaut = 0)
 * @returns Le temps total en millisecondes.
 *
 * @example
 * // Exemple d'utilisation
 * const expiration = getExpirationTime({ s: 30, m: 2, h: 1, d: 0 });
 * console.log(expiration); // 3723000 (1 heure, 2 minutes et 30 secondes en ms)
 */
export function getExpirationTime(
  totalTime: { s?: number; m?: number; h?: number; d?: number } = {
    s: 0,
    m: 0,
    h: 6,
    d: 0,
  }
): number {
  let timeInNumber = 0;

  if (typeof totalTime.s === "number" && !isNaN(totalTime.s)) {
    timeInNumber += totalTime.s;
  }

  if (typeof totalTime.m === "number" && !isNaN(totalTime.m)) {
    timeInNumber += totalTime.m * 60;
  }

  if (typeof totalTime.h === "number" && !isNaN(totalTime.h)) {
    timeInNumber += totalTime.h * 60 * 60;
  }

  if (typeof totalTime.d === "number" && !isNaN(totalTime.d)) {
    timeInNumber += totalTime.d * 60 * 60 * 24;
  }

  return timeInNumber * 1000;
}
