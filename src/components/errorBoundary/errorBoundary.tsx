import { Component } from "preact";

class ErrorBoundary extends Component {
	state = { error: null };

	static getDerivedStateFromError(error: Error) {
		console.error(error);
		return { error: true };
	}

	render() {
		if (this.state.error) {
			return (
				<div class="content-wrapper">
					<p>An error occurred - sorry about that!</p>
					<p>
						Please{" "}
						<a class="error-link" href={window.location.pathname}>
							reload
						</a>{" "}
						to try again.
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
