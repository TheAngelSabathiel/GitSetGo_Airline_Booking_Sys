<script setup>
import { ref } from 'vue';


</script>

<template>
		<!-- Landing Section -->
        <section class="hero-section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-5 mb-lg-0">
                        <h1 class="hero-title">Work, Travel,<br>Save, Repeat</h1>
                        <p class="fs-4">Take only memories, leave only footprints</p>
                    </div>

                    <div class="col-lg-6">
                        <div class="booking-card shadow">
                            <div class="row">
                                <div class="col-12">
                                    <label class="input-label">From</label>
                                    <div class="input-group-custom d-flex justify-content-between align-items-center">
                                        <span><img src="../assets/images/plane_icon.png"> Manila</span>
                                        <span class="text-muted fw-bold">MNL</span>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <label class="input-label">To</label>
                                    <div class="input-group-custom d-flex justify-content-between align-items-center">
                                        <span><img src="../assets/images/plane_icon.png"> Tokyo</span>
                                        <span class="text-muted fw-bold">TKY</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label class="input-label">Date</label>
                                    <div class="input-group-custom">
                                        <img src="../assets/images/Calendar.png"> 13 Dec 2025
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="input-label">Passenger</label>
                                    <div class="input-group-custom d-flex align-items-center justify-content-between">
                                        <img src="../assets/images/user.png">
                                        <div class="btn-group btn-group-sm">
                                            <button class="btn btn-outline-secondary">-</button>
                                            <span class="px-3 pt-2">Qty</span>
                                            <button class="btn btn-outline-secondary">+</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group-custom2 col-md-6 d-flex align-items-end">
                                    <button class="search-btn mt-3">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

		<!-- Page Assistance Section -->
        <section class="assistance-section">
            <div class="container">
                <h4 class="section-title">Passenger Assistance</h4>
                
                <div class="row g-4">
                    <div class="col-md-3">
                        <div class="feature-card">
                            <div class="feature-icon text-dark">
                                <img src="../assets/images/home-check-in.png" alt="Check-in Icon">
                            </div>
                            <h5>Check-in</h5>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-card">
                            <div class="feature-icon text-dark">
                                <img src="../assets/images/home-flight-status.png" alt="Flight Status Icon">
                            </div>
                            <h5>Flight Status</h5>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-card">
                            <div class="feature-icon text-dark">
                                <img src="../assets/images/home-ticket.png" alt="Ticket Icon">
                            </div>
                            <h5>Promotions</h5>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-card">
                            <div class="feature-icon text-dark">
                                <img src="../assets/images/home-booking.png" alt="Booking Icon">
                            </div>
                            <h5>Manage Booking</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<style scoped>
</style>
