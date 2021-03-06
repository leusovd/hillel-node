const messageService = require('../services/message-service.js');

module.exports = function index() {
	return (`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Document</title>		
			<link rel="stylesheet" href="assets/css/style.css">
		</head>
		<body>
			
			<div id="messanger" class="messanger">
				<div class="messanger_header">
					<h1 class="messanger_title">Messanger</h1>
					<button id="settings-trigger" class="btn">Settings</button>
				</div>

				<div class="messanger_settings settings">
					<h2 class="settings_title">Settings</h2>

					<form class="settings_form">

						<div class="settings_field">
							<h3 class="settings_field-title">Sort params</h3>
							<select id="settings-sort-value" name="sort-value">
								<option disabled>Sort value</option>
							</select>
							<select id="settings-sort-dir" name="sort-dir" required>		
								<option disabled>Sort dir</option>					
								<option value="asc" selected>asc</option>						
								<option value="desc">desc</option>						
							</select>
						</div>

						<div class="settings_field">
							<h3 class="settings_field-title">Limit</h3>
							<input id="settings-limit" name="limit" type="number" min="0" max="51">
						</div>

						<div class="settings_field">
							<h3 class="settings_field-title">Skip</h3>
							<input id="settings-skip" name="skip" type="number" min="0" max="501">
						</div>

						<button id="settings-submit" class="btn" type="submit">Save</button>

					</form>
				</div>

				<ul class="message-list"></ul>
				<form class="form">
					<textarea class="form_textarea" name="message"></textarea>
					<p class="form_error">Message is too short</p>
					<button class="btn form_submit" type="submit">Send</button>
				</form>
			</div>

			<script src="assets/js/scripts.js"></script>
		</body>
		</html>
	`);
}