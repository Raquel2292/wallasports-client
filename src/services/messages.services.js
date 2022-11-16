import service from "./config.services";

const getMessages = () => {
  return service.get(`/messages`);
};

const sendMessage = (productId, newMessage) => {
  return service.post(`/messages/${productId}`, newMessage);
};

export { getMessages, sendMessage };
