import prompt from 'prompt';
import colors from 'colors/safe';
import assert from 'assert';

const MESSAGE_COLOR = colors.cyan;
const ALMOST_ZERO = 0.01;

// Input Property Descriptions
// ////////
const properties: { [key: string]: prompt.RevalidatorSchema } = {
  friendName: {
    name: 'friendName',
    description: MESSAGE_COLOR(`Enter a good friend's name`),
    message: 'Please enter some characters',
    required: true,
  },
  payment: {
    name: 'payment',
    description: MESSAGE_COLOR('How much did they spend?'),
    message: 'Please enter a number, whole or decimal, and without "$"',
    required: true,
    pattern: /^\d*\.?\d*$/,
  },
  moreFriends: {
    name: 'moreFriends',
    description: MESSAGE_COLOR(`Do you have more friends? (yes or no)`),
    message: 'Must respond yes or no',
    required: true,
    pattern: /^y(es)?|n[o]?$/,
  },
};

const getFriendNamesAndPayments = async (): Promise<{
  [key: string]: number;
}> => {
  let inputObj: {
    [key: string]: number;
  } = {};

  prompt.start({
    message: '>>',
  });

  let finished = false;
  let i = 0;
  while (!finished) {
    properties.friendName.description = MESSAGE_COLOR(
      `Enter ${i > 0 ? 'another' : 'a'} good friend's name`
    );

    const { friendName, payment, moreFriends } = await prompt.get(
      Object.values(properties)
    );
    inputObj[friendName as string] = Number(payment);

    finished = ['no', 'n'].includes((moreFriends as string).toLowerCase());

    i++;
  }

  return inputObj;
};

export const calculateDebts = (payments: number[]) => {
  const total = payments.reduce((a, b) => a + b, 0);
  const evenAmount = total / payments.length;

  const debts = payments.map((item) => evenAmount - item);

  return debts;
};

// sort debts from smallest to largest (neg to pos == [is owed] to [owes])
const sortFriendsByDebt = (friends: string[], debts: number[]) => {
  let friendDebts: { name: string; debt: number }[] = [];
  friends.forEach((item, i) => {
    friendDebts.push({
      name: item,
      debt: debts[i],
    });
  });

  friendDebts = friendDebts.sort((a, b) => a.debt - b.debt); // asc
  const friendsSorted = friendDebts.map((item) => item.name);
  const debtsSorted = friendDebts.map((item) => item.debt);

  return {
    friendsSorted,
    debtsSorted,
  };
};

/**
 * Build a transaction map that evens out the input debts
 * @param debts array of debts
 * @returns transaction map - a list of transactions between friends to even up
 */
export const buildTransactionMap = (
  debts: number[],
  friends: string[]
): string[] => {
  assert(
    debts.reduce((a, b) => a + b, 0) <= ALMOST_ZERO,
    'The sum of all debts must be zero'
  );

  const { friendsSorted, debtsSorted } = sortFriendsByDebt(friends, debts);

  let transactions: string[] = [];

  let i = 0;
  let j = debts.length - 1;
  while (i < j) {
    let largerAbsValIdx = -1;
    let smallerAbsValIdx = -1;

    if (Math.abs(debtsSorted[i]) <= Math.abs(debtsSorted[j])) {
      smallerAbsValIdx = i;
      largerAbsValIdx = j;
    } else {
      smallerAbsValIdx = j;
      largerAbsValIdx = i;
    }

    const txAmount = Math.abs(debtsSorted[smallerAbsValIdx]);

    // adjust values based on transaction amount. Make sure our signs are right by checking whether or not the left side is positive or negative (aka i or j -> implicit: i should always be neg [is owed], j should always be pos [owes])
    debtsSorted[largerAbsValIdx] -=
      largerAbsValIdx === i ? -txAmount : txAmount;
    debtsSorted[smallerAbsValIdx] = 0;

    const txAmountDisplay = txAmount % 1 === 0 ? txAmount : txAmount.toFixed(2); // int vs float
    transactions.push(
      `${friendsSorted[j]} pays ${friendsSorted[i]} $${txAmountDisplay}`
    );

    if (debtsSorted[i] <= ALMOST_ZERO) i++;
    if (debtsSorted[j] <= ALMOST_ZERO) j--;
  }

  return transactions;
};

const displayTransactions = (
  transactions: string[],
  color?: (x: string) => string
) => {
  console.log('\n');

  transactions.forEach((tx) => {
    const line = color ? color(tx) : tx;
    console.log('>>', line);
  });
};

export const evenUp = async () => {
  const namesAndPayments = await getFriendNamesAndPayments();

  const friends = Object.keys(namesAndPayments);
  const payments = Object.values(namesAndPayments);

  if (friends.length <= 1) {
    console.log('Need more friends, sorry.');
    return;
  }

  const debts = calculateDebts(payments);

  const transactions = buildTransactionMap(debts, friends);
  displayTransactions(transactions, colors.bold);
};
