<template>
	<!-- Greetings Section -->
	<section class="profile-hero">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mb-4">
                    <h1 class="display-5 fw-bold">Good day,<br>Juan Dela Cruz!</h1>
                    <p class="mb-1">ID: 900 000 000</p>
                    <p>Member</p>
                    <button class="btn btn-pink">Edit Profile</button>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-md-1"><label class="info-label">Title:</label><div class="info-value-box">Mr.</div></div>
                <div class="col-md-3"><label class="info-label">First name:</label><div class="info-value-box">Juan</div></div>
                <div class="col-md-3"><label class="info-label">Last name:</label><div class="info-value-box">Dela Cruz</div></div>
                <div class="col-md-1"><label class="info-label">M. I.</label><div class="info-value-box"></div></div>
                
                <div class="col-md-2"><label class="info-label">Gender:</label><div class="info-value-box">Male</div></div>
                <div class="col-md-2"><label class="info-label">Date of Birth:</label><div class="info-value-box">11/15/2000</div></div>
                <div class="col-md-3"><label class="info-label">Contact Number:</label><div class="info-value-box">+63 961 222 2022</div></div>
                <div class="col-md-4"><label class="info-label">Email Address:</label><div class="info-value-box">juandelacruz@gmail.com</div></div>
                
                <div class="col-md-4">
                    <label class="info-label">Default Payment Method:</label>
                    <div class="info-value-box">VISA ●●●● ●●●● 1234</div>
                </div>
            </div>
        </div>
   		</section>

		<!-- Flight Schedule Section -->
		<div class="container pb-5">
	        <h2 class="section-header">Flight Schedule</h2>
	        
	        <div class="flight-card shadow-sm">
	            <div class="row align-items-center text-center text-md-start">
	            	<div class="booking-no">Booking No. 0001 1234</div>
	                <div class="col-md-1 mb-3 mb-md-0">
	                    <img src="../assets/images/icon_black.png" class="airline-logo my-2" alt="Parallox Logo">
	                </div>
	                <div class="col-md-2 mb-3 mb-md-0">
	                    <div class="small">Aircraft 2100<br>Economy</div>
	                </div>
	                <div class="col-md-3">
	                    <p class="time-text">8:30 AM PHT</p>
	                    <p class="date-location">November 19, 2025<br>Manila, Philippines</p>
	                </div>
	                <div class="col-md-3 border-start">
	                    <p class="time-text">12:30 PM JST</p>
	                    <p class="date-location">November 19, 2025<br>Fukuoka, Japan</p>
	                </div>
	                <div class="col-md-3 text-md-start">
	                    <div class="price-text">₱15000.00</div>
	                    <div class="small text-muted">Seats: 2<br>F1, F2</div>
	                </div>
	            </div>
	        </div>
	       	<div class="flight-card shadow-sm">
	            <div class="row align-items-center text-center text-md-start">
	            	<div class="booking-no">Booking No. 0001 1234</div>
	                <div class="col-md-1 mb-3 mb-md-0">
	                    <img src="../assets/images/icon_black.png" class="airline-logo my-2" alt="Parallox Logo">
	                </div>
	                <div class="col-md-2 mb-3 mb-md-0">
	                    <div class="small">Aircraft 2100<br>Economy</div>
	                </div>
	                <div class="col-md-3">
	                    <p class="time-text">8:30 AM PHT</p>
	                    <p class="date-location">November 19, 2025<br>Manila, Philippines</p>
	                </div>
	                <div class="col-md-3 border-start">
	                    <p class="time-text">12:30 PM JST</p>
	                    <p class="date-location">November 19, 2025<br>Fukuoka, Japan</p>
	                </div>
	                <div class="col-md-3 text-md-start">
	                    <div class="price-text">₱15000.00</div>
	                    <div class="small text-muted">Seats: 2<br>F1, F2</div>
	                </div>
	            </div>
	        </div>
	       	<div class="flight-card shadow-sm">
	            <div class="row align-items-center text-center text-md-start">
	            	<div class="booking-no">Booking No. 0001 1234</div>
	                <div class="col-md-1 mb-3 mb-md-0">
	                    <img src="../assets/images/icon_black.png" class="airline-logo my-2" alt="Parallox Logo">
	                </div>
	                <div class="col-md-2 mb-3 mb-md-0">
	                    <div class="small">Aircraft 2100<br>Economy</div>
	                </div>
	                <div class="col-md-3">
	                    <p class="time-text">8:30 AM PHT</p>
	                    <p class="date-location">November 19, 2025<br>Manila, Philippines</p>
	                </div>
	                <div class="col-md-3 border-start">
	                    <p class="time-text">12:30 PM JST</p>
	                    <p class="date-location">November 19, 2025<br>Fukuoka, Japan</p>
	                </div>
	                <div class="col-md-3 text-md-start">
	                    <div class="price-text">₱15000.00</div>
	                    <div class="small text-muted">Seats: 2<br>F1, F2</div>
	                </div>
	            </div>
	        </div>
        </div>

		<!-- Flight History Section -->
		<div class="history-section-bg">
		    <div class="container">
		        <div class="row align-items-end mb-4">
		            <div class="col-lg-4">
		                <h2 class="section-header mb-0">Flight History</h2>
		            </div>
		            
		            <div class="col-lg-8">
		                <div class="d-flex gap-3 justify-content-lg-end align-items-end flex-wrap">
		                    <div style="width: 180px;">
		                        <label class="info-label text-dark">From</label>
		                        <input type="text" class="form-control filter-input" placeholder="October 1, 2025">
		                    </div>
		                    <div style="width: 180px;">
		                        <label class="info-label text-dark">To</label>
		                        <input type="text" class="form-control filter-input" placeholder="October 31, 2025">
		                    </div>
		                    <button class="btn btn-pink px-4 mb-1" style="height: 45px;">Apply Filter</button>
		                </div>
		            </div>
		        </div>

		        <div class="history-card">
		            <div class="row align-items-center">
		            	<div class="booking-no">Booking No. 0001 1234</div>
		                <div class="col-md-1">
		                    <img src="../assets/images/icon_black.png" class="airline-logo" alt="Logo" style="max-width: 100px;">
		                </div>
		               	<div class="col-md-2 text-center text-md-start">
		                    <div class="fw-bold">Aircraft 2100 <br> <span class="fw-normal">Economy</span></div>
		                </div>
		                <div class="col-md-3 text-center text-md-start">
		                    <p class="time-text">8:30 AM PHT</p>
		                    <p class="date-location">October 12, 2025<br>Manila, Philippines</p>
		                </div>
		                <div class="col-md-3 text-center text-md-start">
		                    <p class="time-text">12:30 PM JST</p>
		                    <p class="date-location">October 12, 2025<br>Fukuoka, Japan</p>
		                </div>
		                <div class="col-md-3 text-md-start text-center">
		                    <div class="price-text">₱15000.00</div>
		                    <div class="small text-muted">Seats: 2<br>F1, F2</div>
		                </div>
		            </div>
		        </div>
		        <div class="history-card">
		            <div class="row align-items-center">
		            	<div class="booking-no">Booking No. 0001 1234</div>
		                <div class="col-md-1">
		                    <img src="../assets/images/icon_black.png" class="airline-logo" alt="Logo" style="max-width: 100px;">
		                </div>
		               	<div class="col-md-2 text-center text-md-start">
		                    <div class="fw-bold">Aircraft 2100 <br> <span class="fw-normal">Economy</span></div>
		                </div>
		                <div class="col-md-3 text-center text-md-start">
		                    <p class="time-text">8:30 AM PHT</p>
		                    <p class="date-location">October 12, 2025<br>Manila, Philippines</p>
		                </div>
		                <div class="col-md-3 text-center text-md-start">
		                    <p class="time-text">12:30 PM JST</p>
		                    <p class="date-location">October 12, 2025<br>Fukuoka, Japan</p>
		                </div>
		                <div class="col-md-3 text-md-start text-center">
		                    <div class="price-text">₱15000.00</div>
		                    <div class="small text-muted">Seats: 2<br>F1, F2</div>
		                </div>
		            </div>
		        </div>
		       	<div class="history-card">
		            <div class="row align-items-center">
		            	<div class="booking-no">Booking No. 0001 1234</div>
		                <div class="col-md-1">
		                    <img src="../assets/images/icon_black.png" class="airline-logo" alt="Logo" style="max-width: 100px;">
		                </div>
		               	<div class="col-md-2 text-center text-md-start">
		                    <div class="fw-bold">Aircraft 2100 <br> <span class="fw-normal">Economy</span></div>
		                </div>
		                <div class="col-md-3 text-center text-md-start">
		                    <p class="time-text">8:30 AM PHT</p>
		                    <p class="date-location">October 12, 2025<br>Manila, Philippines</p>
		                </div>
		                <div class="col-md-3 text-center text-md-start">
		                    <p class="time-text">12:30 PM JST</p>
		                    <p class="date-location">October 12, 2025<br>Fukuoka, Japan</p>
		                </div>
		                <div class="col-md-3 text-md-start text-center">
		                    <div class="price-text">₱15000.00</div>
		                    <div class="small text-muted">Seats: 2<br>F1, F2</div>
		                </div>
		            </div>
		        </div>

		   </div>
	</div>
</template>

<script setup>
	
</script>