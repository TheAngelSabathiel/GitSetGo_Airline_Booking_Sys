<script setup>
	
</script>

<template>
		<div>
            <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
                <div class="container-fluid">
                    <router-link class="navbar-brand" to="/">
                        <img src="../assets/images/icon_white2.png" class="logo-image" height="40px" width="60px" alt="Logo">
                    </router-link>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0"> 
                        	<li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Manage Booking</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Flight Information</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About Us</a>
                            </li>
                            <router-link class="nav-link" to="/profile">
                        	My Profile
                        	</router-link>
                        </ul>

                        <div class="d-flex align-items-lg-center gap-3 mt-3 mt-lg-0 flex-column flex-lg-row">
                            <router-link to="/login">
                            	<button class="btn rounded-pill text-white custom-button">
                                Log In
                            	</button>
                            </router-link>

                            <button class="btn rounded-pill text-white custom-button">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
</template>