<template>
		<!-- Login Form Section -->
		<section class="login-page">
			<div class="login-content">
				<h2>Log in to Parallox</h2>
				<p>
					With Parallox Airways, every mile is a moment of refinement.<br>
					Earn Miles across our global network and elevate your world<br>
					with bespoke rewards and unforgettable journeys.
				</p>

			<div class="login-card">
				<h4>Login</h4>

				<form id="login-form">
					<input type="text" id="email" placeholder="Email Address or Username" required>
					<input type="password" id="password" placeholder="Password" required>

					<label class="checkbox">
						<input type="checkbox" id="keepLoggedIn">
						Keep me logged in on this device
					</label>

					<div id="errorMessage" style="color: red; margin: 10px 0;"></div>

				<button type="submit" class="btn-primary">Login</button>

				</form>

				<div class="login-links">
					<p>Don't have an account? <a href="#">Sign Up</a></p>
					<p>Forgot your Password? <a href="#">Reset here</a></p>
				</div>
			</div>
			</div>
		</section>
</template>

<script setup>
	
</script>