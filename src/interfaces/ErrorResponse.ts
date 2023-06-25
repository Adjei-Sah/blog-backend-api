import MessageResponse from './MessageREsponse';

export default interface ErrorResponse extends MessageResponse {
  stack?: string;
}