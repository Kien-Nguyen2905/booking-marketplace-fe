export type TMessage = {
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
};
