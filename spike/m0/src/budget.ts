export class BudgetExceededError extends Error {
  constructor(
    public readonly spentEur: number,
    public readonly nextEur: number,
    public readonly capEur: number
  ) {
    super(
      `Budget atteint : ${spentEur.toFixed(2)} € dépensés + ${nextEur.toFixed(
        2
      )} € > plafond ${capEur.toFixed(2)} €`
    );
    this.name = "BudgetExceededError";
  }
}

/** Garde de budget : vérifie AVANT chaque appel (contrainte M0 : 50 €, arrêt automatique). */
export class BudgetGuard {
  private spent = 0;

  constructor(private readonly capEur: number) {
    if (!(capEur > 0)) throw new Error("Le plafond de budget doit être > 0");
  }

  get spentEur(): number {
    return this.spent;
  }

  /** Lève une erreur si l'appel estimé ferait dépasser le plafond. */
  assertCanSpend(estimatedEur: number): void {
    if (this.spent + estimatedEur > this.capEur) {
      throw new BudgetExceededError(this.spent, estimatedEur, this.capEur);
    }
  }

  record(actualEur: number): void {
    if (actualEur < 0 || !Number.isFinite(actualEur))
      throw new Error("Coût invalide");
    this.spent += actualEur;
  }
}
