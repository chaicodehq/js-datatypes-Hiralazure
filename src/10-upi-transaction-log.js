/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  if (!Array.isArray(transactions) || transactions.length === 0) return null;

  // Valid transactions: amount > 0 and type is debit or credit
  const validTransactions = transactions.filter(
    (trans) =>
      trans &&
      typeof trans.amount === "number" &&
      trans.amount > 0 &&
      (trans.type === "debit" || trans.type === "credit"),
  );

  if (validTransactions.length === 0) return null;

  // Total amount (sum of all transaction amounts)
  const totalAmount = validTransactions.reduce(
    (sum, trans) => sum + trans.amount,
    0,
  );
  let freq = {};
  let frequentContact = null;

  validTransactions.forEach((trans) => {
    if (!trans.to) return;

    freq[trans.to] = (freq[trans.to] || 0) + 1;

    if (frequentContact === null || freq[trans.to] > freq[frequentContact]) {
      frequentContact = trans.to;
    }
  });
  const highestTransaction = validTransactions.reduce((max, trans) => {
    if (!max || trans.amount > max.amount) return trans;
    return max;
  }, null);
  const { totalCredit, totalDebit } = validTransactions.reduce(
    (acc, trans) => {
      if (trans.type === "credit") acc.totalCredit += trans.amount;
      if (trans.type === "debit") acc.totalDebit += trans.amount;
      return acc;
    },
    { totalCredit: 0, totalDebit: 0 },
  );

  // Net balance
  const netBalance = totalCredit - totalDebit;

  // Category breakdown
  const categoryBreakdown = validTransactions.reduce((acc, trans) => {
    const category = trans.category || "uncategorized";
    acc[category] = (acc[category] || 0) + trans.amount;
    return acc;
  }, {});

  // Count & average
  const transactionCount = validTransactions.length;
  const avgTransaction = parseFloat(
    (totalAmount / transactionCount).toFixed(2),
  );

  // Checks
  const allAbove100 = validTransactions.every((t) => t.amount > 100);
  const hasLargeTransaction = validTransactions.some((t) => t.amount > 500);

  return {
    validTransactions,
    totalAmount,
    totalCredit,
    totalDebit,
    netBalance,
    frequentContact,
    categoryBreakdown,
    transactionCount,
    avgTransaction,
    allAbove100,
    hasLargeTransaction,
  };
}
console.log(
  analyzeUPITransactions([
    {
      id: "T1",
      type: "debit",
      amount: 200,
      to: "A",
      category: "food",
      date: "2025-01-01",
    },
    {
      id: "T2",
      type: "debit",
      amount: 150,
      to: "B",
      category: "food",
      date: "2025-01-02",
    },
  ]),
);
