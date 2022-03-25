import { cells } from './grid.js'

function addConversation(sender, receiver, messageType, responseType){
	// adds conversation with Speech objects added to sender and receiver in conversation.js
	var senderFeeling = (messageType === 'greeting') ? '' : ` and felt ${messageType}`;
	var receiverFeeling = (responseType === 'greeting') ?  '' : `, and ${receiver.name} felt ${responseType}`;

	sender.narrative = sender.narrative + `${sender.name} spoke to ${receiver.name}${senderFeeling}.
	It said "${sender.speech[sender.speech.length-1].message}", and ${receiver.name} replied "${receiver.speech[receiver.speech.length-1].message}". `;

	receiver.narrative = receiver.narrative + `${sender.name} spoke to ${receiver.name}${receiverFeeling}.
	${sender.name} said "${sender.speech[sender.speech.length-1].message}", and ${receiver.name} replied "${receiver.speech[receiver.speech.length-1].message}". `;
}

function generateNarrative (agent) {
	agent.narrative = `${agent.name} is a ${agent.personality} ${agent.type}. `;
}

export { addConversation, generateNarrative };
