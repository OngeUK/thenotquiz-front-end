const fireAnalyticsEvent = (eventName: string, eventData = {}) => {
	try {
		gtag("event", eventName, eventData);
	} catch (error) {
		console.error(error);
	}
};

export default fireAnalyticsEvent;
