export enum MessageSource {
  user = 'user',
  server = 'server'
}

export interface IMessage {
  text: string
  source: MessageSource
}
