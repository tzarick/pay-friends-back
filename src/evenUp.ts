import prompt from 'prompt';
import colors from 'colors/safe';

const MESSAGE_COLOR = colors.cyan;

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

    const { friendName, payment, moreFriends } = await prompt.get([
      ...Object.values(properties),
    ]);
    inputObj[friendName as string] = Number(payment);

    finished = ['no', 'n'].includes((moreFriends as string).toLowerCase());

    i++;
  }

  return inputObj;
};

// TODO
const calculateDebts = (payments: number[]) => {};

export const evenUp = async () => {
  try {
    const namesAndPayments = await getFriendNamesAndPayments();
    console.log(namesAndPayments);
    const friends = Object.keys(namesAndPayments);
    const payments = Object.values(namesAndPayments);

    console.log(`Friends: ${friends}`);
    console.log(`Payments: ${payments}`);

    const debts = calculateDebts(payments); // TODO
  } catch (_) {
    console.log('Something went wrong while evening up :( Please try again!');
  }
};
