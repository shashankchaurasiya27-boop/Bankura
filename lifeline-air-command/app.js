// Life-Line Air Command Center JavaScript

// Enhanced Performance Metrics System
class PerformanceMetrics {
    constructor() {
        this.metrics = {
            successRate: { value: 94.7, target: 95, trend: 2.3 },
            responseTime: { value: 8.3, target: 8, trend: 0.2 },
            missions: { value: 12, target: 20, trend: 3 },
            uptime: { value: 99.2, target: 99, trend: 0 },
            efficiency: { value: 87.4, target: 90, trend: 1.8 },
            safety: { value: 0, target: 0, trend: 0 }
        };
        this.updateInterval = null;
        this.isUpdating = false;
    }

    init() {
        this.updateMetricsDisplay();
        this.startRealTimeUpdates();
        this.addInteractiveEffects();
    }

    updateMetricsDisplay() {
        Object.keys(this.metrics).forEach(key => {
            const metric = this.metrics[key];
            const card = document.querySelector(`.metric-card.${key}`);
            if (card) {
                // Update metric value
                const valueElement = card.querySelector('.metric-value');
                if (valueElement) {
                    this.animateValue(valueElement, metric.value, key);
                }

                // Update progress bar
                const progressBar = card.querySelector('.progress-bar');
                if (progressBar) {
                    const percentage = Math.min((metric.value / metric.target) * 100, 100);
                    progressBar.style.width = `${percentage}%`;
                }

                // Update trend
                const trendElement = card.querySelector('.trend-value');
                if (trendElement) {
                    const trendText = metric.trend > 0 ? `+${metric.trend}` : 
                                    metric.trend < 0 ? `${metric.trend}` : '0';
                    trendElement.textContent = trendText + (key === 'responseTime' ? ' min' : 
                                                           key === 'missions' ? '' : '%');
                }
            }
        });

        // Update last updated time
        const lastUpdatedElement = document.getElementById('last-updated');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = 'Just now';
        }
    }

    animateValue(element, targetValue, metricType) {
        const currentValue = parseFloat(element.textContent) || 0;
        const increment = (targetValue - currentValue) / 20;
        let current = currentValue;
        
        const animation = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= targetValue) || 
                (increment < 0 && current <= targetValue)) {
                current = targetValue;
                clearInterval(animation);
            }
            
            if (metricType === 'responseTime') {
                element.textContent = current.toFixed(1) + ' min';
            } else if (metricType === 'missions') {
                element.textContent = Math.round(current);
            } else {
                element.textContent = current.toFixed(1) + '%';
            }
        }, 50);
    }

    startRealTimeUpdates() {
        this.updateInterval = setInterval(() => {
            this.simulateRealTimeData();
        }, 30000); // Update every 30 seconds
    }

    simulateRealTimeData() {
        if (this.isUpdating) return;
        this.isUpdating = true;

        // Simulate small variations in metrics
        Object.keys(this.metrics).forEach(key => {
            const metric = this.metrics[key];
            const variation = (Math.random() - 0.5) * 0.2; // ±0.1 variation
            
            if (key === 'responseTime') {
                metric.value = Math.max(5.0, Math.min(12.0, metric.value + variation));
            } else if (key === 'missions') {
                // Missions only increase during the day
                if (new Date().getHours() >= 6 && new Date().getHours() <= 22) {
                    metric.value = Math.max(0, metric.value + Math.random() * 0.1);
                }
            } else if (key === 'safety') {
                // Safety incidents are rare
                if (Math.random() < 0.01) { // 1% chance
                    metric.value += 1;
                }
            } else {
                metric.value = Math.max(0, Math.min(100, metric.value + variation));
            }
        });

        this.updateMetricsDisplay();
        this.isUpdating = false;
    }

    addInteractiveEffects() {
        // Add click effects to metric cards
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showMetricDetails(card);
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add pulse effect to status indicator
        const statusIndicator = document.querySelector('.performance-status .status-indicator');
        if (statusIndicator) {
            setInterval(() => {
                statusIndicator.style.animation = 'none';
                setTimeout(() => {
                    statusIndicator.style.animation = 'pulse-success 2s infinite';
                }, 100);
            }, 5000);
        }
    }

    showMetricDetails(card) {
        const metricType = card.classList[1]; // Get the second class (metric type)
        const metric = this.metrics[metricType];
        
        // Create modal for detailed view
        const modal = document.createElement('div');
        modal.className = 'metric-detail-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.getMetricTitle(metricType)} Details</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="metric-detail-content">
                        <div class="detail-item">
                            <span class="detail-label">Current Value</span>
                            <span class="detail-value">${metric.value}${this.getMetricUnit(metricType)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Target</span>
                            <span class="detail-value">${metric.target}${this.getMetricUnit(metricType)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Trend</span>
                            <span class="detail-value ${metric.trend >= 0 ? 'positive' : 'negative'}">
                                ${metric.trend >= 0 ? '+' : ''}${metric.trend}${this.getMetricUnit(metricType)}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Performance</span>
                            <span class="detail-value">${this.getPerformanceStatus(metric)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .metric-detail-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            
            .metric-detail-modal .modal-content {
                background: var(--color-gray-900);
                border: 1px solid var(--color-gray-700);
                border-radius: var(--radius-xl);
                padding: var(--space-6);
                max-width: 400px;
                width: 90%;
                animation: slideIn 0.3s ease;
            }
            
            .metric-detail-content {
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
            }
            
            .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--space-3);
                background: var(--color-gray-800);
                border-radius: var(--radius-md);
            }
            
            .detail-label {
                font-size: var(--font-size-sm);
                color: var(--color-gray-400);
            }
            
            .detail-value {
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-semibold);
                color: var(--color-white);
            }
            
            .detail-value.positive {
                color: var(--color-success-400);
            }
            
            .detail-value.negative {
                color: var(--color-error-400);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Close modal functionality
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
            style.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                style.remove();
            }
        });
    }

    getMetricTitle(type) {
        const titles = {
            successRate: 'Success Rate',
            responseTime: 'Response Time',
            missions: 'Missions Today',
            uptime: 'Fleet Uptime',
            efficiency: 'Fuel Efficiency',
            safety: 'Safety Incidents'
        };
        return titles[type] || type;
    }

    getMetricUnit(type) {
        if (type === 'responseTime') return ' min';
        if (type === 'missions') return '';
        return '%';
    }

    getPerformanceStatus(metric) {
        const percentage = (metric.value / metric.target) * 100;
        if (percentage >= 100) return 'EXCELLENT';
        if (percentage >= 90) return 'GOOD';
        if (percentage >= 70) return 'FAIR';
        return 'NEEDS IMPROVEMENT';
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Authentication System
class AuthenticationSystem {
    constructor() {
        this.isAuthenticated = false;
        this.user = null;
        this.validCredentials = {
            'admin': { password: 'admin123', accessCode: 'MEDICAL2025', role: 'Medical Officer' },
            'operator': { password: 'operator123', accessCode: 'FLEET2025', role: 'Fleet Operator' },
            'technician': { password: 'tech123', accessCode: 'MAINT2025', role: 'Maintenance Technician' },
            'commander': { password: 'commander123', accessCode: 'COMMAND2025', role: 'Fleet Commander' }
        };
        this.loginAttempts = 0;
        this.maxAttempts = 3;
        this.lockoutTime = 5 * 60 * 1000; // 5 minutes
        this.lockoutUntil = null;
    }

    async authenticate(username, password, accessCode) {
        // Check if account is locked
        if (this.isLocked()) {
            throw new Error('Account locked due to multiple failed attempts. Please try again later.');
        }

        // Validate credentials
        if (this.validCredentials[username]) {
            const user = this.validCredentials[username];
            if (user.password === password && user.accessCode === accessCode) {
                this.isAuthenticated = true;
                this.user = {
                    username: username,
                    role: user.role,
                    loginTime: new Date().toISOString()
                };
                this.loginAttempts = 0;
                this.lockoutUntil = null;
                
                // Store in session storage
                sessionStorage.setItem('lifeline_auth', JSON.stringify(this.user));
                
                return { success: true, user: this.user };
            }
        }

        // Failed attempt
        this.loginAttempts++;
        if (this.loginAttempts >= this.maxAttempts) {
            this.lockoutUntil = Date.now() + this.lockoutTime;
            throw new Error('Too many failed attempts. Account locked for 5 minutes.');
        }

        throw new Error(`Invalid credentials. ${this.maxAttempts - this.loginAttempts} attempts remaining.`);
    }

    isLocked() {
        return this.lockoutUntil && Date.now() < this.lockoutUntil;
    }

    logout() {
        this.isAuthenticated = false;
        this.user = null;
        sessionStorage.removeItem('lifeline_auth');
    }

    checkSession() {
        const stored = sessionStorage.getItem('lifeline_auth');
        if (stored) {
            try {
                this.user = JSON.parse(stored);
                this.isAuthenticated = true;
                return true;
            } catch (e) {
                sessionStorage.removeItem('lifeline_auth');
            }
        }
        return false;
    }
}

class LifeLineApp {
    constructor() {
        this.auth = new AuthenticationSystem();
        this.performanceMetrics = new PerformanceMetrics();
        this.currentScreen = 'dashboard';
        this.activeFilters = new Set(['all']);
        this.missionData = this.loadMissionData();
        this.init();
    }

    init() {
        // Check if user is already authenticated
        if (this.auth.checkSession()) {
            this.showMainApp();
        } else {
            this.showLoginScreen();
        }
        
        this.setupAuthentication();
        this.setupNavigation();
        this.setupEmergencyLaunch();
        this.setupFleetManagement();
        this.setupMissionPlanning();
        this.setupRealTimeUpdates();
        this.setupInteractiveElements();
        this.setupDataVisualization();
        this.setupFleetSecurity();
        this.setupPerformanceOptimization();
        this.loadInitialData();
    }

    setupAuthentication() {
        const loginForm = document.getElementById('login-form');
        const logoutBtn = document.getElementById('logout-btn');

        if (loginForm) {
            console.log('🔐 Setting up login form authentication');
            
            // Prevent any form submission
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔐 Login form submitted - preventing default');
                await this.handleLogin(e);
                return false;
            });
            
            // Also prevent on form submit event
            loginForm.onsubmit = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔐 Form onsubmit prevented');
                return false;
            };
            
        } else {
            console.error('❌ Login form not found!');
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    async handleLogin(event) {
        console.log('🔐 Starting login process');
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const accessCode = formData.get('access-code');

        console.log('🔐 Login credentials:', { username, password: '***', accessCode });

        const loginBtn = event.target.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        
        try {
            // Show loading state
            loginBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">AUTHENTICATING...</span>';
            loginBtn.disabled = true;

            // Simulate network delay for realism
            await new Promise(resolve => setTimeout(resolve, 1500));

            const result = await this.auth.authenticate(username, password, accessCode);
            
            if (result.success) {
                console.log('✅ Authentication successful!', result.user);
                this.showNotification('Authentication successful! Welcome, ' + result.user.role, 'success');
                this.showMainApp();
            } else {
                console.log('❌ Authentication failed');
            }
        } catch (error) {
            this.showNotification(error.message, 'error');
            console.error('Authentication error:', error);
        } finally {
            // Reset button state
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }
    }

    handleLogout() {
        this.auth.logout();
        this.showNotification('Logged out successfully', 'info');
        this.showLoginScreen();
    }

    showLoginScreen() {
        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');
        
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (mainApp) mainApp.classList.add('hidden');
        
        // Clear form
        const loginForm = document.getElementById('login-form');
        if (loginForm) loginForm.reset();
    }

    showMainApp() {
        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');
        
        if (loginScreen) loginScreen.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        // Update user role in header
        const userRole = document.querySelector('.user-role');
        if (userRole && this.auth.user) {
            userRole.textContent = `${this.auth.user.role} • CLASSIFIED`;
        }
        
        // Initialize enhanced performance metrics
        this.performanceMetrics.init();
    }

    loadMissionData() {
        return {
            // Fleet Security - Threat Detection and Response
            fleetSecurity: {
                threatDetection: {
                    activeThreats: [
                        {
                            id: "TH-2025-001",
                            type: "Electronic Warfare",
                            severity: "high",
                            description: "GPS spoofing attempt detected",
                            affectedDrones: ["LA-001", "LA-003"],
                            location: {lat: 34.0522, lng: -118.2437},
                            timestamp: new Date().toISOString(),
                            status: "active",
                            countermeasures: ["Switching to backup navigation", "Activating anti-spoofing protocols"],
                            responseLevel: "DEFCON 2"
                        },
                        {
                            id: "TH-2025-002", 
                            type: "Physical Threat",
                            severity: "medium",
                            description: "Small arms fire detected in sector Alpha-7",
                            affectedDrones: ["LA-005"],
                            location: {lat: 34.0322, lng: -118.2237},
                            timestamp: new Date(Date.now() - 300000).toISOString(),
                            status: "monitoring",
                            countermeasures: ["Altitude increase", "Route diversion"],
                            responseLevel: "DEFCON 3"
                        },
                        {
                            id: "TH-2025-003",
                            type: "Cyber Attack",
                            severity: "critical",
                            description: "Malware intrusion attempt on communication systems",
                            affectedDrones: ["LA-002"],
                            location: {lat: 34.0622, lng: -118.2537},
                            timestamp: new Date(Date.now() - 600000).toISOString(),
                            status: "contained",
                            countermeasures: ["Network isolation", "System reboot", "Security patch deployment"],
                            responseLevel: "DEFCON 1"
                        },
                        {
                            id: "TH-2025-004",
                            type: "Weather Threat",
                            severity: "medium",
                            description: "Severe wind conditions affecting flight operations",
                            affectedDrones: ["LA-007", "LA-009"],
                            location: {lat: 34.0822, lng: -118.2737},
                            timestamp: new Date(Date.now() - 120000).toISOString(),
                            status: "active",
                            countermeasures: ["Altitude adjustment", "Route diversion", "Speed reduction"],
                            responseLevel: "DEFCON 3"
                        },
                        {
                            id: "TH-2025-005",
                            type: "Equipment Failure",
                            severity: "high",
                            description: "Critical battery failure detected in multiple units",
                            affectedDrones: ["LA-008", "LA-010"],
                            location: {lat: 34.0122, lng: -118.2037},
                            timestamp: new Date(Date.now() - 300000).toISOString(),
                            status: "monitoring",
                            countermeasures: ["Emergency landing protocols", "Battery replacement", "System diagnostics"],
                            responseLevel: "DEFCON 2"
                        }
                    ],
                    threatHistory: [
                        {
                            id: "TH-2025-004",
                            type: "Jamming",
                            severity: "medium",
                            description: "RF jamming detected in sector Bravo-3",
                            timestamp: new Date(Date.now() - 3600000).toISOString(),
                            status: "resolved",
                            resolution: "Switched to frequency-hopping mode"
                        }
                    ],
                    threatTypes: {
                        "Electronic Warfare": {
                            count: 2,
                            severity: "high",
                            lastOccurrence: new Date().toISOString()
                        },
                        "Physical Threat": {
                            count: 1,
                            severity: "medium", 
                            lastOccurrence: new Date(Date.now() - 300000).toISOString()
                        },
                        "Cyber Attack": {
                            count: 1,
                            severity: "critical",
                            lastOccurrence: new Date(Date.now() - 600000).toISOString()
                        }
                    }
                },
                securityMetrics: {
                    threatDetectionRate: 98.5,
                    responseTime: 2.3, // seconds
                    falsePositiveRate: 1.2,
                    systemUptime: 99.8,
                    securityScore: 94.7
                },
                responseProtocols: {
                    emergencyLanding: {
                        enabled: true,
                        triggers: ["critical_threat", "system_failure", "communication_loss"],
                        priority: "immediate"
                    },
                    routeDiversion: {
                        enabled: true,
                        triggers: ["physical_threat", "weather_hazard", "airspace_conflict"],
                        priority: "high"
                    },
                    communicationEncryption: {
                        enabled: true,
                        level: "AES-256",
                        keyRotation: "every_4_hours"
                    },
                    backupSystems: {
                        navigation: "inertial_navigation",
                        communication: "satellite_link",
                        power: "emergency_battery"
                    }
                }
            },
            // Performance Optimization - Overall Fleet Optimization
            performanceOptimization: {
                routeOptimization: {
                    activeOptimizations: [
                        {
                            missionId: "M-2025-001",
                            droneId: "LA-001",
                            originalRoute: "Route A: 12.5km, 18min",
                            optimizedRoute: "Route B: 9.8km, 14min",
                            fuelSavings: 22.4,
                            timeSavings: 4.2,
                            efficiencyGain: 18.7
                        },
                        {
                            missionId: "M-2025-002",
                            droneId: "LA-003", 
                            originalRoute: "Route C: 15.2km, 22min",
                            optimizedRoute: "Route D: 13.1km, 19min",
                            fuelSavings: 13.8,
                            timeSavings: 3.0,
                            efficiencyGain: 12.1
                        }
                    ],
                    optimizationMetrics: {
                        averageFuelSavings: 18.1,
                        averageTimeSavings: 3.6,
                        optimizationSuccessRate: 94.2,
                        totalOptimizationsToday: 12
                    }
                },
                resourceAllocation: {
                    batteryManagement: {
                        chargingStations: [
                            {id: "CS-001", location: "Base Alpha", capacity: 8, available: 6},
                            {id: "CS-002", location: "FOB Bravo", capacity: 4, available: 2},
                            {id: "CS-003", location: "Field Hospital", capacity: 6, available: 4}
                        ],
                        batterySwapSchedule: [
                            {droneId: "LA-001", scheduledTime: "14:30", station: "CS-001"},
                            {droneId: "LA-003", scheduledTime: "15:15", station: "CS-002"},
                            {droneId: "LA-007", scheduledTime: "16:00", station: "CS-001"},
                            {droneId: "LA-008", scheduledTime: "16:45", station: "CS-003"},
                            {droneId: "LA-009", scheduledTime: "17:30", station: "CS-002"}
                        ]
                    },
                    payloadDistribution: {
                        medicalSupplies: {
                            totalCapacity: 100,
                            utilized: 78,
                            distribution: {
                                "Blood Products": 35,
                                "Emergency Medications": 28,
                                "Surgical Equipment": 15
                            }
                        },
                        priorityAllocation: [
                            {supply: "Blood Products", priority: "critical", allocation: 40},
                            {supply: "Emergency Medications", priority: "high", allocation: 30},
                            {supply: "Surgical Equipment", priority: "medium", allocation: 20},
                            {supply: "General Supplies", priority: "low", allocation: 10}
                        ]
                    }
                },
                efficiencyMetrics: {
                    fleetUtilization: 87.3,
                    missionEfficiency: 94.7,
                    fuelEfficiency: 91.2,
                    maintenanceEfficiency: 88.9,
                    overallEfficiency: 90.5
                },
                optimizationRecommendations: [
                    {
                        type: "Route Optimization",
                        priority: "high",
                        description: "Implement dynamic weather routing for LA-005",
                        potentialSavings: "15% fuel reduction",
                        implementationTime: "2 hours"
                    },
                    {
                        type: "Battery Management",
                        priority: "medium",
                        description: "Optimize charging schedule during peak hours",
                        potentialSavings: "8% energy cost reduction",
                        implementationTime: "1 hour"
                    },
                    {
                        type: "Payload Distribution",
                        priority: "low",
                        description: "Redistribute medical supplies based on demand patterns",
                        potentialSavings: "12% faster response times",
                        implementationTime: "30 minutes"
                    }
                ]
            },
            // AI Predictive Analytics Data
            predictiveAnalytics: {
                maintenancePredictions: [
                    {
                        droneId: "LA-001",
                        predictedMaintenanceDate: "2025-10-15",
                        confidence: 0.87,
                        riskFactors: ["Battery degradation", "Motor wear", "Navigation drift"],
                        recommendedActions: ["Battery replacement", "Motor inspection", "GPS calibration"],
                        urgency: "medium"
                    },
                    {
                        droneId: "LA-002", 
                        predictedMaintenanceDate: "2025-09-28",
                        confidence: 0.94,
                        riskFactors: ["Critical battery failure", "Communication instability", "Payload system errors"],
                        recommendedActions: ["Immediate battery replacement", "Communication system overhaul", "Payload system diagnostics"],
                        urgency: "high"
                    },
                    {
                        droneId: "LA-003",
                        predictedMaintenanceDate: "2025-11-02",
                        confidence: 0.76,
                        riskFactors: ["Minor motor vibration", "Navigation accuracy drift"],
                        recommendedActions: ["Motor balancing", "Navigation system calibration"],
                        urgency: "low"
                    },
                    {
                        droneId: "LA-007",
                        predictedMaintenanceDate: "2025-10-22",
                        confidence: 0.82,
                        riskFactors: ["Motor bearing wear", "Communication antenna degradation"],
                        recommendedActions: ["Motor inspection", "Antenna replacement", "System calibration"],
                        urgency: "medium"
                    },
                    {
                        droneId: "LA-008",
                        predictedMaintenanceDate: "2025-09-30",
                        confidence: 0.95,
                        riskFactors: ["Critical battery failure", "Navigation system malfunction", "Communication instability"],
                        recommendedActions: ["Immediate battery replacement", "Navigation system overhaul", "Communication diagnostics"],
                        urgency: "high"
                    },
                    {
                        droneId: "LA-009",
                        predictedMaintenanceDate: "2025-11-15",
                        confidence: 0.71,
                        riskFactors: ["Payload system wear", "Minor motor vibration"],
                        recommendedActions: ["Payload system inspection", "Motor balancing"],
                        urgency: "low"
                    },
                    {
                        droneId: "LA-010",
                        predictedMaintenanceDate: "2025-10-05",
                        confidence: 0.98,
                        riskFactors: ["Complete system failure", "Battery degradation", "Communication loss"],
                        recommendedActions: ["Full system overhaul", "Battery replacement", "Communication system repair"],
                        urgency: "critical"
                    }
                ],
                performanceForecasts: {
                    fleetReliability: {
                        current: 94.7,
                        predicted30Days: 92.3,
                        predicted90Days: 89.1,
                        trend: "declining"
                    },
                    missionSuccessRate: {
                        current: 96.2,
                        predicted30Days: 95.8,
                        predicted90Days: 94.5,
                        trend: "stable"
                    },
                    maintenanceCosts: {
                        current: 12500,
                        predicted30Days: 18750,
                        predicted90Days: 31200,
                        trend: "increasing"
                    }
                },
                anomalyDetection: [
                    {
                        droneId: "LA-001",
                        anomaly: "Unusual vibration pattern detected",
                        severity: "medium",
                        timestamp: new Date().toISOString(),
                        description: "Motor vibration increased by 15% during last flight"
                    },
                    {
                        droneId: "LA-004",
                        anomaly: "Communication signal degradation",
                        severity: "high", 
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        description: "Signal strength dropped below 30% for 5 minutes"
                    },
                    {
                        droneId: "LA-007",
                        anomaly: "Temperature fluctuation detected",
                        severity: "medium",
                        timestamp: new Date(Date.now() - 900000).toISOString(),
                        description: "Internal temperature varying by ±3°C during stable flight"
                    },
                    {
                        droneId: "LA-008",
                        anomaly: "Battery voltage instability",
                        severity: "critical",
                        timestamp: new Date(Date.now() - 300000).toISOString(),
                        description: "Battery voltage dropping rapidly with intermittent power loss"
                    },
                    {
                        droneId: "LA-009",
                        anomaly: "Navigation accuracy drift",
                        severity: "low",
                        timestamp: new Date(Date.now() - 600000).toISOString(),
                        description: "GPS accuracy decreased by 0.5 meters during last mission"
                    },
                    {
                        droneId: "LA-010",
                        anomaly: "Complete system shutdown",
                        severity: "critical",
                        timestamp: new Date(Date.now() - 2400000).toISOString(),
                        description: "All systems offline - emergency protocols activated"
                    }
                ]
            },
            droneFleet: [
                {
                    id: "LA-001",
                    name: "Lifeline Alpha",
                    status: "operational",
                    battery: 87,
                    location: {lat: 34.0522, lng: -118.2437, altitude: 120, heading: 45},
                    payload: "Medical Supplies - 75% capacity",
                    flightHours: 127,
                    lastMaintenance: "2025-09-20",
                    systemHealth: "excellent",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 45, // km/h
                        altitude: 120, // meters
                        heading: 45, // degrees
                        temperature: 24, // °C
                        humidity: 65, // %
                        windSpeed: 12, // km/h
                        windDirection: 180, // degrees
                        signalStrength: 95, // %
                        gpsAccuracy: 2.1, // meters
                        vibration: 0.2, // g-force
                        pressure: 1013.25, // hPa
                        lastUpdate: new Date().toISOString()
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 98,
                        batteryHealth: 95,
                        communicationHealth: 99,
                        navigationHealth: 97,
                        payloadHealth: 92,
                        overallHealth: 96
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-001", type: "Medical Supply", status: "completed", date: "2025-09-25"},
                        {id: "M-2025-002", type: "Emergency Response", status: "completed", date: "2025-09-24"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-10-15",
                        lastInspection: "2025-09-20",
                        totalMaintenanceHours: 45,
                        criticalAlerts: 0,
                        warnings: 1
                    }
                },
                {
                    id: "LA-002", 
                    name: "Lifeline Bravo",
                    status: "maintenance",
                    battery: 15,
                    location: {lat: 34.0622, lng: -118.2537, altitude: 0, heading: 0},
                    payload: "Empty",
                    flightHours: 203,
                    lastMaintenance: "2025-09-15",
                    systemHealth: "needs_service",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 0,
                        altitude: 0,
                        heading: 0,
                        temperature: 22,
                        humidity: 70,
                        windSpeed: 8,
                        windDirection: 160,
                        signalStrength: 45,
                        gpsAccuracy: 5.2,
                        vibration: 0.8,
                        pressure: 1012.8,
                        lastUpdate: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 75,
                        batteryHealth: 20,
                        communicationHealth: 60,
                        navigationHealth: 85,
                        payloadHealth: 100,
                        overallHealth: 68
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-003", type: "Medical Supply", status: "completed", date: "2025-09-23"},
                        {id: "M-2025-004", type: "Emergency Response", status: "failed", date: "2025-09-22"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-09-28",
                        lastInspection: "2025-09-15",
                        totalMaintenanceHours: 78,
                        criticalAlerts: 2,
                        warnings: 3
                    }
                },
                {
                    id: "LA-003",
                    name: "Lifeline Charlie", 
                    status: "operational",
                    battery: 92,
                    location: {lat: 34.0422, lng: -118.2337, altitude: 85, heading: 120},
                    payload: "Blood Products - 60% capacity",
                    flightHours: 89,
                    lastMaintenance: "2025-09-22",
                    systemHealth: "excellent",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 38,
                        altitude: 85,
                        heading: 120,
                        temperature: 25,
                        humidity: 58,
                        windSpeed: 15,
                        windDirection: 200,
                        signalStrength: 88,
                        gpsAccuracy: 1.8,
                        vibration: 0.1,
                        pressure: 1014.1,
                        lastUpdate: new Date().toISOString()
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 99,
                        batteryHealth: 98,
                        communicationHealth: 95,
                        navigationHealth: 99,
                        payloadHealth: 88,
                        overallHealth: 96
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-005", type: "Blood Transport", status: "in_progress", date: "2025-09-26"},
                        {id: "M-2025-006", type: "Medical Supply", status: "completed", date: "2025-09-25"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-10-20",
                        lastInspection: "2025-09-22",
                        totalMaintenanceHours: 32,
                        criticalAlerts: 0,
                        warnings: 0
                    }
                },
                {
                    id: "LA-004",
                    name: "Lifeline Delta",
                    status: "offline",
                    battery: 0,
                    location: {lat: 34.0722, lng: -118.2637, altitude: 0, heading: 0},
                    payload: "Emergency Equipment - 30% capacity",
                    flightHours: 156,
                    lastMaintenance: "2025-09-10",
                    systemHealth: "critical",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 0,
                        altitude: 0,
                        heading: 0,
                        temperature: 23,
                        humidity: 72,
                        windSpeed: 10,
                        windDirection: 170,
                        signalStrength: 0,
                        gpsAccuracy: 0,
                        vibration: 0,
                        pressure: 1013.5,
                        lastUpdate: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 45,
                        batteryHealth: 0,
                        communicationHealth: 0,
                        navigationHealth: 30,
                        payloadHealth: 75,
                        overallHealth: 38
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-007", type: "Emergency Response", status: "failed", date: "2025-09-21"},
                        {id: "M-2025-008", type: "Medical Supply", status: "completed", date: "2025-09-20"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-09-30",
                        lastInspection: "2025-09-10",
                        totalMaintenanceHours: 120,
                        criticalAlerts: 5,
                        warnings: 8
                    }
                },
                {
                    id: "LA-005",
                    name: "Lifeline Echo",
                    status: "operational",
                    battery: 78,
                    location: {lat: 34.0322, lng: -118.2237, altitude: 95, heading: 270},
                    payload: "Surgical Supplies - 45% capacity", 
                    flightHours: 134,
                    lastMaintenance: "2025-09-18",
                    systemHealth: "good",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 42,
                        altitude: 95,
                        heading: 270,
                        temperature: 26,
                        humidity: 62,
                        windSpeed: 18,
                        windDirection: 220,
                        signalStrength: 82,
                        gpsAccuracy: 2.5,
                        vibration: 0.3,
                        pressure: 1012.9,
                        lastUpdate: new Date().toISOString()
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 92,
                        batteryHealth: 85,
                        communicationHealth: 88,
                        navigationHealth: 94,
                        payloadHealth: 90,
                        overallHealth: 90
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-009", type: "Surgical Supply", status: "completed", date: "2025-09-25"},
                        {id: "M-2025-010", type: "Medical Supply", status: "completed", date: "2025-09-24"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-10-12",
                        lastInspection: "2025-09-18",
                        totalMaintenanceHours: 56,
                        criticalAlerts: 0,
                        warnings: 2
                    }
                },
                {
                    id: "LA-006",
                    name: "Lifeline Foxtrot",
                    status: "operational",
                    battery: 94,
                    location: {lat: 34.0522, lng: -118.2137, altitude: 110, heading: 90},
                    payload: "Empty - Ready for mission",
                    flightHours: 67,
                    lastMaintenance: "2025-09-24", 
                    systemHealth: "excellent",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 0,
                        altitude: 110,
                        heading: 90,
                        temperature: 24,
                        humidity: 60,
                        windSpeed: 14,
                        windDirection: 190,
                        signalStrength: 96,
                        gpsAccuracy: 1.5,
                        vibration: 0.1,
                        pressure: 1013.8,
                        lastUpdate: new Date().toISOString()
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 100,
                        batteryHealth: 99,
                        communicationHealth: 98,
                        navigationHealth: 100,
                        payloadHealth: 100,
                        overallHealth: 99
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-011", type: "Emergency Response", status: "completed", date: "2025-09-25"},
                        {id: "M-2025-012", type: "Medical Supply", status: "completed", date: "2025-09-24"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-10-25",
                        lastInspection: "2025-09-24",
                        totalMaintenanceHours: 18,
                        criticalAlerts: 0,
                        warnings: 0
                    }
                },
                {
                    id: "LA-007",
                    name: "Lifeline Golf",
                    status: "operational",
                    battery: 65,
                    location: {lat: 34.0822, lng: -118.2737, altitude: 75, heading: 180},
                    payload: "Pharmaceuticals - 90% capacity",
                    flightHours: 198,
                    lastMaintenance: "2025-09-19",
                    systemHealth: "good",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 35,
                        altitude: 75,
                        heading: 180,
                        temperature: 23,
                        humidity: 68,
                        windSpeed: 16,
                        windDirection: 210,
                        signalStrength: 79,
                        gpsAccuracy: 2.8,
                        vibration: 0.4,
                        pressure: 1013.2,
                        lastUpdate: new Date().toISOString()
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 89,
                        batteryHealth: 78,
                        communicationHealth: 85,
                        navigationHealth: 91,
                        payloadHealth: 95,
                        overallHealth: 88
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-013", type: "Pharmaceutical Delivery", status: "completed", date: "2025-09-26"},
                        {id: "M-2025-014", type: "Medical Supply", status: "completed", date: "2025-09-25"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-10-08",
                        lastInspection: "2025-09-19",
                        totalMaintenanceHours: 67,
                        criticalAlerts: 0,
                        warnings: 1
                    }
                },
                {
                    id: "LA-008",
                    name: "Lifeline Hotel",
                    status: "maintenance",
                    battery: 8,
                    location: {lat: 34.0122, lng: -118.2037, altitude: 0, heading: 0},
                    payload: "Empty",
                    flightHours: 245,
                    lastMaintenance: "2025-09-12",
                    systemHealth: "needs_service",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 0,
                        altitude: 0,
                        heading: 0,
                        temperature: 21,
                        humidity: 75,
                        windSpeed: 9,
                        windDirection: 150,
                        signalStrength: 25,
                        gpsAccuracy: 6.1,
                        vibration: 1.2,
                        pressure: 1012.3,
                        lastUpdate: new Date(Date.now() - 600000).toISOString() // 10 minutes ago
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 68,
                        batteryHealth: 12,
                        communicationHealth: 45,
                        navigationHealth: 72,
                        payloadHealth: 100,
                        overallHealth: 59
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-015", type: "Emergency Response", status: "failed", date: "2025-09-24"},
                        {id: "M-2025-016", type: "Medical Supply", status: "completed", date: "2025-09-23"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-09-29",
                        lastInspection: "2025-09-12",
                        totalMaintenanceHours: 95,
                        criticalAlerts: 3,
                        warnings: 4
                    }
                },
                {
                    id: "LA-009",
                    name: "Lifeline India",
                    status: "operational",
                    battery: 81,
                    location: {lat: 34.0922, lng: -118.2837, altitude: 105, heading: 315},
                    payload: "Organ Transport Container - 100% capacity",
                    flightHours: 112,
                    lastMaintenance: "2025-09-21",
                    systemHealth: "excellent",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 48,
                        altitude: 105,
                        heading: 315,
                        temperature: 22,
                        humidity: 55,
                        windSpeed: 11,
                        windDirection: 140,
                        signalStrength: 93,
                        gpsAccuracy: 1.9,
                        vibration: 0.2,
                        pressure: 1014.5,
                        lastUpdate: new Date().toISOString()
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 97,
                        batteryHealth: 89,
                        communicationHealth: 96,
                        navigationHealth: 98,
                        payloadHealth: 100,
                        overallHealth: 96
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-017", type: "Organ Transport", status: "in_progress", date: "2025-09-26"},
                        {id: "M-2025-018", type: "Emergency Response", status: "completed", date: "2025-09-25"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-10-18",
                        lastInspection: "2025-09-21",
                        totalMaintenanceHours: 41,
                        criticalAlerts: 0,
                        warnings: 0
                    }
                },
                {
                    id: "LA-010",
                    name: "Lifeline Juliet",
                    status: "offline",
                    battery: 0,
                    location: {lat: 34.0222, lng: -118.1937, altitude: 0, heading: 0},
                    payload: "Emergency Medical Kit - 20% capacity",
                    flightHours: 189,
                    lastMaintenance: "2025-09-08",
                    systemHealth: "critical",
                    // Enhanced telemetry data
                    telemetry: {
                        speed: 0,
                        altitude: 0,
                        heading: 0,
                        temperature: 20,
                        humidity: 78,
                        windSpeed: 13,
                        windDirection: 165,
                        signalStrength: 0,
                        gpsAccuracy: 0,
                        vibration: 0,
                        pressure: 1011.8,
                        lastUpdate: new Date(Date.now() - 2400000).toISOString() // 40 minutes ago
                    },
                    // System health metrics
                    systemMetrics: {
                        motorHealth: 52,
                        batteryHealth: 0,
                        communicationHealth: 0,
                        navigationHealth: 35,
                        payloadHealth: 60,
                        overallHealth: 37
                    },
                    // Mission history
                    missionHistory: [
                        {id: "M-2025-019", type: "Emergency Response", status: "failed", date: "2025-09-22"},
                        {id: "M-2025-020", type: "Medical Supply", status: "completed", date: "2025-09-21"}
                    ],
                    // Maintenance schedule
                    maintenanceSchedule: {
                        nextScheduled: "2025-09-30",
                        lastInspection: "2025-09-08",
                        totalMaintenanceHours: 108,
                        criticalAlerts: 6,
                        warnings: 9
                    }
                }
            ],
            activeMissions: [
                {
                    id: "M-2025-001",
                    droneId: "LA-001",
                    type: "Medical Supply Delivery",
                    priority: "high",
                    progress: 67,
                    destination: "FOB Alpha",
                    eta: "14:30",
                    payload: "Blood products, Pain medication"
                },
                {
                    id: "M-2025-002", 
                    droneId: "LA-003",
                    type: "Casualty Evacuation Support",
                    priority: "critical",
                    progress: 23,
                    destination: "Grid 123-456",
                    eta: "15:45",
                    payload: "Emergency medical kit, Defibrillator"
                }
            ],
            threatLevel: {
                current: "DEFCON 3",
                description: "Increased readiness",
                color: "#D97706",
                lastUpdated: "2025-09-26T10:15:00Z"
            },
            weatherConditions: {
                temperature: "24°C",
                windSpeed: "12 km/h",
                visibility: "8 km", 
                conditions: "Partly cloudy",
                flightSafety: "good"
            },
            fleetPerformance: {
                successRate: 94.7,
                averageResponseTime: "8.3 min",
                missionsToday: 12,
                totalFlightHours: 1247
            }
        };
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const screens = document.querySelectorAll('.screen');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.hapticFeedback();
                const targetScreen = button.dataset.screen;
                
                // Update navigation state
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update screen visibility - ensure proper screen IDs are used
                screens.forEach(screen => screen.classList.remove('active'));
                const targetScreenElement = document.getElementById(`${targetScreen}-screen`);
                if (targetScreenElement) {
                    targetScreenElement.classList.add('active');
                    this.currentScreen = targetScreen;
                    this.loadScreenData(targetScreen);
                } else {
                    console.warn(`Screen not found: ${targetScreen}-screen`);
                }
            });
        });
    }

    setupEmergencyLaunch() {
        const emergencyBtn = document.getElementById('emergency-launch');
        const modal = document.getElementById('emergency-modal');
        const cancelBtn = document.getElementById('cancel-emergency');
        const confirmBtn = document.getElementById('confirm-emergency');

        if (emergencyBtn && modal) {
            emergencyBtn.addEventListener('click', () => {
                this.hapticFeedback('heavy');
                modal.classList.remove('hidden');
                this.simulateBiometricScan();
            });
        }

        if (cancelBtn && modal) {
            cancelBtn.addEventListener('click', () => {
                this.hapticFeedback();
                modal.classList.add('hidden');
            });
        }

        if (confirmBtn && modal) {
            confirmBtn.addEventListener('click', () => {
                this.hapticFeedback('heavy');
                this.launchEmergencyMission();
                modal.classList.add('hidden');
            });
        }

        // Close modal on background click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }
    }

    setupFleetManagement() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const fleetItems = document.querySelectorAll('.fleet-item');
        const searchInput = document.getElementById('fleet-search');
        const sortSelect = document.getElementById('fleet-sort');
        const sortDirectionBtn = document.getElementById('sort-direction');

        // Initialize enhanced filtering state
        this.currentFilters = {
            status: 'all',
            battery: 'all',
            health: 'all',
            mission: 'all',
            location: 'all',
            maintenance: 'all'
        };
        this.searchQuery = '';
        this.sortBy = 'id';
        this.sortDirection = 'asc';
        this.advancedFilters = {
            dateRange: null,
            flightHours: { min: 0, max: 1000 },
            lastMaintenance: null,
            systemHealth: {}
        };

        // Enhanced search functionality with debouncing
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                this.hapticFeedback();
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchQuery = e.target.value.toLowerCase();
                    this.applyAdvancedFilters();
                }, 300); // 300ms debounce
            });

            // Add search suggestions
            this.setupSearchSuggestions(searchInput);
        }

        // Enhanced filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.hapticFeedback();
                
                // Remove active class from all buttons in the same group
                const group = button.closest('.filter-group');
                if (group) {
                    group.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                }
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                this.updateFilter(filter);
            });
        });

        // Enhanced sort functionality
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.hapticFeedback();
                this.sortBy = e.target.value;
                this.applyAdvancedFilters();
            });
        }

        if (sortDirectionBtn) {
            sortDirectionBtn.addEventListener('click', () => {
                this.hapticFeedback();
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                sortDirectionBtn.textContent = this.sortDirection === 'asc' ? '↑' : '↓';
                sortDirectionBtn.dataset.direction = this.sortDirection;
                this.applyAdvancedFilters();
            });
        }

        // Enhanced fleet item expansion with smooth animations
        fleetItems.forEach(item => {
            const header = item.querySelector('.fleet-item-header');
            if (header) {
                header.addEventListener('click', () => {
                    this.hapticFeedback();
                    this.toggleFleetItemExpansion(item);
                });
            }
        });

        // Initialize advanced filtering UI
        this.initializeAdvancedFiltering();
        
        // Setup quick actions
        this.setupQuickActions();
    }

    setupMissionPlanning() {
        const toolButtons = document.querySelectorAll('.tool-btn');
        const missionMap = document.querySelector('.mission-map');
        const waypoints = document.querySelectorAll('.waypoint-marker');

        // Tool selection
        toolButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.hapticFeedback();
                
                toolButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const tool = button.dataset.tool;
                this.setActiveTool(tool);
            });
        });

        // Waypoint interaction
        waypoints.forEach(waypoint => {
            waypoint.addEventListener('click', () => {
                this.hapticFeedback();
                this.selectWaypoint(waypoint);
            });
        });

        // Map click for new waypoints
        if (missionMap) {
            missionMap.addEventListener('click', (e) => {
                if (this.activeTool === 'waypoint') {
                    this.addWaypoint(e);
                }
            });
        }

        // Setup drone control interface
        this.setupDroneControlInterface();
    }

    setupRealTimeUpdates() {
        // Initialize WebSocket connection
        this.initializeWebSocket();
        
        // Fallback to simulated updates if WebSocket fails
        this.setupSimulatedUpdates();
        
        // Update time displays
        setInterval(() => {
            this.updateTimeDisplays();
        }, 1000);

        // Real-time fleet health monitoring
        this.initializeFleetHealthMonitoring();
        
        // Predictive maintenance system
        this.initializePredictiveMaintenance();
    }

    initializeWebSocket() {
        try {
            // In a real implementation, this would connect to your WebSocket server
            // For demo purposes, we'll simulate WebSocket behavior
            this.websocket = {
                readyState: 1, // WebSocket.OPEN
                send: (data) => {
                    console.log('WebSocket send:', data);
                },
                close: () => {
                    console.log('WebSocket closed');
                }
            };
            
            // Simulate WebSocket connection
            this.simulateWebSocketConnection();
            
            this.showNotification('Real-time connection established', 'success');
        } catch (error) {
            console.error('WebSocket initialization failed:', error);
            this.showNotification('Real-time connection failed - Using simulated updates', 'warning');
        }
    }

    simulateWebSocketConnection() {
        // Simulate receiving real-time data every 5 seconds
        setInterval(() => {
            if (this.websocket && this.websocket.readyState === 1) {
                this.processWebSocketMessage({
                    type: 'telemetry_update',
                    data: this.generateTelemetryUpdate()
                });
            }
        }, 5000);

        // Simulate mission updates every 15 seconds
        setInterval(() => {
            if (this.websocket && this.websocket.readyState === 1) {
                this.processWebSocketMessage({
                    type: 'mission_update',
                    data: this.generateMissionUpdate()
                });
            }
        }, 15000);

        // Simulate system alerts
        setInterval(() => {
            if (this.websocket && this.websocket.readyState === 1 && Math.random() < 0.1) {
                this.processWebSocketMessage({
                    type: 'system_alert',
                    data: this.generateSystemAlert()
                });
            }
        }, 30000);
    }

    processWebSocketMessage(message) {
        switch (message.type) {
            case 'telemetry_update':
                this.handleTelemetryUpdate(message.data);
                break;
            case 'mission_update':
                this.handleMissionUpdate(message.data);
                break;
            case 'system_alert':
                this.handleSystemAlert(message.data);
                break;
            case 'drone_status_change':
                this.handleDroneStatusChange(message.data);
                break;
            default:
                console.log('Unknown WebSocket message type:', message.type);
        }
    }

    handleTelemetryUpdate(data) {
        const drone = this.missionData.droneFleet.find(d => d.id === data.droneId);
        if (drone) {
            // Update telemetry data
            Object.assign(drone.telemetry, data.telemetry);
            drone.telemetry.lastUpdate = new Date().toISOString();
            
            // Update system metrics if provided
            if (data.systemMetrics) {
                Object.assign(drone.systemMetrics, data.systemMetrics);
            }
            
            // Update UI
            const card = document.querySelector(`[data-drone="${drone.id}"]`);
            if (card) {
                this.updateDroneCard(card, drone);
            }
            
            // Add visual indicator for real-time update
            this.showRealTimeIndicator(drone.id);
        }
    }

    handleMissionUpdate(data) {
        const mission = this.missionData.activeMissions.find(m => m.id === data.missionId);
        if (mission) {
            Object.assign(mission, data.updates);
            
            // Update progress bars
            const progressBars = document.querySelectorAll('.progress-fill');
            const progressTexts = document.querySelectorAll('.progress-text');
            
            progressBars.forEach((bar, index) => {
                if (this.missionData.activeMissions[index] && 
                    this.missionData.activeMissions[index].id === data.missionId) {
                    const progress = Math.round(mission.progress);
                    bar.style.width = `${progress}%`;
                    if (progressTexts[index]) {
                        progressTexts[index].textContent = `${progress}%`;
                    }
                }
            });
            
            this.showNotification(`Mission ${data.missionId} updated`, 'info');
        }
    }

    handleSystemAlert(data) {
        this.showNotification(data.message, data.severity || 'warning');
        
        // Update connection status if it's a communication alert
        if (data.type === 'communication') {
            const indicator = document.querySelector('.connection-status .status-indicator');
            if (indicator) {
                indicator.style.background = data.severity === 'error' ? 'var(--alert-red)' : 'var(--communication-green)';
            }
        }
    }

    handleDroneStatusChange(data) {
        const drone = this.missionData.droneFleet.find(d => d.id === data.droneId);
        if (drone) {
            const oldStatus = drone.status;
            drone.status = data.newStatus;
            
            // Update UI
            const card = document.querySelector(`[data-drone="${drone.id}"]`);
            if (card) {
                card.className = `drone-card ${data.newStatus}`;
                this.updateDroneCard(card, drone);
            }
            
            this.showNotification(`Drone ${drone.id} status changed: ${oldStatus} → ${data.newStatus}`, 'info');
        }
    }

    generateTelemetryUpdate() {
        const drone = this.missionData.droneFleet[Math.floor(Math.random() * this.missionData.droneFleet.length)];
        return {
            droneId: drone.id,
            telemetry: {
                speed: Math.max(0, drone.telemetry.speed + (Math.random() - 0.5) * 10),
                altitude: Math.max(0, drone.telemetry.altitude + (Math.random() - 0.5) * 20),
                heading: (drone.telemetry.heading + (Math.random() - 0.5) * 30) % 360,
                temperature: drone.telemetry.temperature + (Math.random() - 0.5) * 2,
                humidity: Math.max(0, Math.min(100, drone.telemetry.humidity + (Math.random() - 0.5) * 10)),
                windSpeed: Math.max(0, drone.telemetry.windSpeed + (Math.random() - 0.5) * 5),
                windDirection: (drone.telemetry.windDirection + (Math.random() - 0.5) * 20) % 360,
                signalStrength: Math.max(0, Math.min(100, drone.telemetry.signalStrength + (Math.random() - 0.5) * 10)),
                gpsAccuracy: Math.max(0.5, drone.telemetry.gpsAccuracy + (Math.random() - 0.5) * 1),
                vibration: Math.max(0, drone.telemetry.vibration + (Math.random() - 0.5) * 0.2),
                pressure: drone.telemetry.pressure + (Math.random() - 0.5) * 2
            },
            systemMetrics: {
                motorHealth: Math.max(0, Math.min(100, drone.systemMetrics.motorHealth + (Math.random() - 0.5) * 2)),
                batteryHealth: Math.max(0, Math.min(100, drone.systemMetrics.batteryHealth + (Math.random() - 0.5) * 1)),
                communicationHealth: Math.max(0, Math.min(100, drone.systemMetrics.communicationHealth + (Math.random() - 0.5) * 3)),
                navigationHealth: Math.max(0, Math.min(100, drone.systemMetrics.navigationHealth + (Math.random() - 0.5) * 2)),
                payloadHealth: Math.max(0, Math.min(100, drone.systemMetrics.payloadHealth + (Math.random() - 0.5) * 1)),
                overallHealth: Math.max(0, Math.min(100, drone.systemMetrics.overallHealth + (Math.random() - 0.5) * 2))
            }
        };
    }

    generateMissionUpdate() {
        const mission = this.missionData.activeMissions[Math.floor(Math.random() * this.missionData.activeMissions.length)];
        return {
            missionId: mission.id,
            updates: {
                progress: Math.min(100, mission.progress + Math.random() * 5),
                eta: this.calculateETA(Math.floor(Math.random() * 30))
            }
        };
    }

    generateSystemAlert() {
        const alerts = [
            { type: 'communication', message: 'Signal interference detected in sector 7', severity: 'warning' },
            { type: 'weather', message: 'Wind speed increasing - Flight restrictions may apply', severity: 'info' },
            { type: 'maintenance', message: 'Scheduled maintenance reminder for LA-002', severity: 'info' },
            { type: 'security', message: 'Unauthorized access attempt detected', severity: 'error' },
            { type: 'performance', message: 'Fleet performance above target threshold', severity: 'success' },
            { type: 'maintenance', message: 'Critical maintenance required for LA-008 and LA-010', severity: 'error' },
            { type: 'weather', message: 'Severe weather warning affecting LA-007 and LA-009', severity: 'warning' },
            { type: 'communication', message: 'Communication system restored for LA-009', severity: 'success' }
        ];
        
        return alerts[Math.floor(Math.random() * alerts.length)];
    }

    showRealTimeIndicator(droneId) {
        const card = document.querySelector(`[data-drone="${droneId}"]`);
        if (card) {
            card.style.borderColor = 'var(--communication-green)';
            card.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.3)';
            
            setTimeout(() => {
                card.style.borderColor = '';
                card.style.boxShadow = '';
            }, 1000);
        }
    }

    setupSimulatedUpdates() {
        // Fallback simulated updates every 10 seconds
        setInterval(() => {
            this.updateMissionProgress();
            this.updateDroneStatus();
            this.updateTelemetry();
        }, 10000);
    }

    setupInteractiveElements() {
        // Enhanced touch interactions for cards
        const droneCards = document.querySelectorAll('.drone-card');
        droneCards.forEach(card => {
            // Click/tap interaction
            card.addEventListener('click', () => {
                this.hapticFeedback();
                this.showDroneDetails(card.dataset.drone);
            });
            
            // Long press for additional options
            this.setupLongPress(card, () => {
                this.hapticFeedback('heavy');
                this.showDroneContextMenu(card.dataset.drone);
            });
        });

        // Enhanced drone card action buttons
        this.setupDroneActionButtons();
        
        // 3D drone model interactions
        this.setupDroneVisualizations();

        // Mission item interactions
        const missionItems = document.querySelectorAll('.mission-item');
        missionItems.forEach(item => {
            item.addEventListener('click', () => {
                this.hapticFeedback();
                this.showMissionDetails(item);
            });
            
            // Long press for mission options
            this.setupLongPress(item, () => {
                this.hapticFeedback('heavy');
                this.showMissionContextMenu(item);
            });
        });

        // Inventory item interactions
        const inventoryItems = document.querySelectorAll('.inventory-item');
        inventoryItems.forEach(item => {
            item.addEventListener('click', () => {
                this.hapticFeedback();
                this.showInventoryDetails(item);
            });
        });

        // Layer toggle functionality
        const layerButtons = document.querySelectorAll('.layer-btn');
        layerButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.hapticFeedback();
                
                layerButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const layer = button.dataset.layer;
                this.toggleMapLayer(layer);
            });
        });

        // Enhanced mobile navigation
        this.setupMobileNavigation();
        
        // Pull-to-refresh functionality
        this.setupPullToRefresh();
        
        // Mobile-optimized gestures
        this.setupMobileGestures();
    }

    setupLongPress(element, callback, duration = 500) {
        let pressTimer = null;
        
        const startPress = (e) => {
            if (pressTimer === null) {
                pressTimer = setTimeout(() => {
                    callback(e);
                    pressTimer = null;
                }, duration);
            }
        };
        
        const cancelPress = () => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };
        
        element.addEventListener('touchstart', startPress, { passive: true });
        element.addEventListener('touchend', cancelPress, { passive: true });
        element.addEventListener('touchmove', cancelPress, { passive: true });
        element.addEventListener('mousedown', startPress);
        element.addEventListener('mouseup', cancelPress);
        element.addEventListener('mouseleave', cancelPress);
    }

    setupMobileNavigation() {
        // Enhanced navigation for mobile
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.target.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            button.addEventListener('touchend', (e) => {
                e.target.style.transform = '';
            }, { passive: true });
        });
    }

    setupPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let isRefreshing = false;
        
        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (window.scrollY === 0 && !isRefreshing) {
                currentY = e.touches[0].clientY;
                const pullDistance = currentY - startY;
                
                if (pullDistance > 0 && pullDistance > 100) {
                    // Show pull-to-refresh indicator
                    this.showPullToRefreshIndicator(pullDistance);
                }
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (window.scrollY === 0 && !isRefreshing) {
                const pullDistance = currentY - startY;
                
                if (pullDistance > 100) {
                    this.triggerRefresh();
                }
                
                this.hidePullToRefreshIndicator();
            }
        }, { passive: true });
    }

    setupMobileGestures() {
        // Pinch-to-zoom for maps (simulated)
        let initialDistance = 0;
        let currentScale = 1;
        
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                initialDistance = Math.sqrt(
                    Math.pow(touch2.clientX - touch1.clientX, 2) +
                    Math.pow(touch2.clientY - touch1.clientY, 2)
                );
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && initialDistance > 0) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const currentDistance = Math.sqrt(
                    Math.pow(touch2.clientX - touch1.clientX, 2) +
                    Math.pow(touch2.clientY - touch1.clientY, 2)
                );
                
                const scale = currentDistance / initialDistance;
                currentScale = Math.max(0.5, Math.min(2, scale));
                
                // Apply zoom to map elements
                const maps = document.querySelectorAll('.mission-map, .tactical-map');
                maps.forEach(map => {
                    map.style.transform = `scale(${currentScale})`;
                });
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) {
                initialDistance = 0;
            }
        }, { passive: true });
    }

    showDroneContextMenu(droneId) {
        const drone = this.missionData.droneFleet.find(d => d.id === droneId);
        if (drone) {
            const options = [
                { label: 'View Details', action: () => this.showDroneDetails(droneId) },
                { label: 'Send Command', action: () => this.sendDroneCommand(droneId) },
                { label: 'Schedule Maintenance', action: () => this.scheduleMaintenance(droneId) },
                { label: 'View Mission History', action: () => this.showMissionHistory(droneId) }
            ];
            
            this.showContextMenu(options, `Drone ${droneId} Options`);
        }
    }

    showMissionContextMenu(missionElement) {
        const missionId = missionElement.querySelector('.mission-id')?.textContent;
        const options = [
            { label: 'View Details', action: () => this.showMissionDetails(missionElement) },
            { label: 'Update Progress', action: () => this.updateMissionProgress(missionId) },
            { label: 'Cancel Mission', action: () => this.cancelMission(missionId) },
            { label: 'Send Message', action: () => this.sendMissionMessage(missionId) }
        ];
        
        this.showContextMenu(options, `Mission ${missionId} Options`);
    }

    showContextMenu(options, title) {
        // Create context menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'context-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.cssText = `
            background: var(--command-blue);
            border: 1px solid var(--tactical-green);
            border-radius: var(--radius-lg);
            padding: var(--space-16);
            min-width: 250px;
            max-width: 90vw;
        `;
        
        const titleEl = document.createElement('h3');
        titleEl.textContent = title;
        titleEl.style.cssText = `
            color: var(--tactical-green);
            margin-bottom: var(--space-16);
            text-align: center;
            font-size: var(--font-size-lg);
        `;
        menu.appendChild(titleEl);
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.label;
            button.className = 'context-menu-option';
            button.style.cssText = `
                width: 100%;
                padding: var(--space-12);
                margin-bottom: var(--space-8);
                background: transparent;
                border: 1px solid rgba(75, 85, 99, 0.4);
                border-radius: var(--radius-base);
                color: var(--arctic-white);
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            button.addEventListener('click', () => {
                option.action();
                document.body.removeChild(overlay);
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.background = 'var(--tactical-green)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = 'transparent';
            });
            
            menu.appendChild(button);
        });
        
        overlay.appendChild(menu);
        document.body.appendChild(overlay);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    showPullToRefreshIndicator(distance) {
        // Create or update pull-to-refresh indicator
        let indicator = document.getElementById('pull-to-refresh');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'pull-to-refresh';
            indicator.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 60px;
                background: var(--tactical-green);
                color: var(--arctic-white);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                z-index: 1000;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(indicator);
        }
        
        const progress = Math.min(distance / 150, 1);
        indicator.style.transform = `translateY(${-60 + (progress * 60)}px)`;
        indicator.textContent = progress > 0.8 ? 'Release to refresh' : 'Pull to refresh';
    }

    hidePullToRefreshIndicator() {
        const indicator = document.getElementById('pull-to-refresh');
        if (indicator) {
            indicator.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                if (document.body.contains(indicator)) {
                    document.body.removeChild(indicator);
                }
            }, 300);
        }
    }

    triggerRefresh() {
        this.showNotification('Refreshing data...', 'info');
        
        // Simulate refresh
        setTimeout(() => {
            this.loadInitialData();
            this.showNotification('Data refreshed', 'success');
        }, 1000);
    }

    sendDroneCommand(droneId) {
        this.showNotification(`Sending command to ${droneId}...`, 'info');
    }

    scheduleMaintenance(droneId) {
        this.showNotification(`Scheduling maintenance for ${droneId}...`, 'info');
    }

    showMissionHistory(droneId) {
        const drone = this.missionData.droneFleet.find(d => d.id === droneId);
        if (drone && drone.missionHistory) {
            const history = drone.missionHistory.map(m => `${m.id}: ${m.type} (${m.status})`).join('\n');
            this.showNotification(`Mission history for ${droneId}:\n${history}`, 'info');
        }
    }

    updateMissionProgress(missionId) {
        this.showNotification(`Updating progress for ${missionId}...`, 'info');
    }

    cancelMission(missionId) {
        this.showNotification(`Cancelling mission ${missionId}...`, 'warning');
    }

    sendMissionMessage(missionId) {
        this.showNotification(`Sending message for ${missionId}...`, 'info');
    }

    loadInitialData() {
        this.updateDashboard();
        this.updateFleetStatus();
        this.updateMissionStatus();
        this.updateInventoryStatus();
    }

    loadScreenData(screenName) {
        switch (screenName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'fleet':
                this.updateFleetDetails();
                break;
            case 'missions':
                this.updateMissionPlanning();
                break;
            case 'inventory':
                this.updateInventoryData();
                break;
            case 'mapping':
                this.updateTacticalMap();
                break;
        }
    }

    updateDashboard() {
        // Update drone status indicators with fixed battery display
        this.missionData.droneFleet.forEach(drone => {
            const card = document.querySelector(`[data-drone="${drone.id}"]`);
            if (card) {
                this.updateDroneCard(card, drone);
            }
        });

        // Update mission progress
        this.updateMissionProgress();
        
        // Update performance metrics
        this.updatePerformanceMetrics();
    }

    updateDroneCard(card, droneData) {
        // Update battery display
        const batteryEl = card.querySelector('.stat-value[class*="battery"]');
        if (batteryEl) {
            const batteryValue = Math.round(droneData.battery);
            batteryEl.textContent = `${batteryValue}%`;
            batteryEl.className = `stat-value battery-${this.getBatteryClass(batteryValue)}`;
        }
        
        // Update status
        const statusEl = card.querySelector('.stat-value[class*="status"]');
        if (statusEl) {
            statusEl.textContent = droneData.status.toUpperCase();
            statusEl.className = `stat-value status-${droneData.status}`;
        }
        
        // Update speed
        const speedEl = card.querySelector('.stat-value');
        if (speedEl && speedEl.textContent.includes('km/h')) {
            speedEl.textContent = `${droneData.telemetry.speed} km/h`;
        }
        
        // Update altitude
        const altitudeEls = card.querySelectorAll('.stat-value');
        altitudeEls.forEach(el => {
            if (el.textContent.includes('m') && !el.textContent.includes('km/h')) {
                el.textContent = `${droneData.telemetry.altitude}m`;
            }
        });
        
        // Update signal strength
        const signalEl = card.querySelector('.stat-value[class*="signal"]');
        if (signalEl) {
            signalEl.textContent = `${droneData.telemetry.signalStrength}%`;
            signalEl.className = `stat-value signal-${this.getSignalClass(droneData.telemetry.signalStrength)}`;
        }
        
        // Update health indicator
        const healthScoreEl = card.querySelector('.health-score');
        const healthFillEl = card.querySelector('.health-fill');
        if (healthScoreEl && healthFillEl && droneData.systemMetrics) {
            const healthScore = droneData.systemMetrics.overallHealth;
            healthScoreEl.textContent = `${healthScore}%`;
            healthFillEl.style.width = `${healthScore}%`;
        }
        
        // Update GPS accuracy
        const gpsAccuracyEl = card.querySelector('.telemetry-value');
        if (gpsAccuracyEl && gpsAccuracyEl.textContent.includes('m') && !gpsAccuracyEl.textContent.includes('%')) {
            gpsAccuracyEl.textContent = `${droneData.telemetry.gpsAccuracy}m`;
        }
        
        // Update last update time
        const timeEls = card.querySelectorAll('.time-display');
        timeEls.forEach(el => {
            if (droneData.telemetry.lastUpdate) {
                const updateTime = new Date(droneData.telemetry.lastUpdate);
                el.textContent = updateTime.toLocaleTimeString();
            }
        });
    }

    updateMissionProgress() {
        this.missionData.activeMissions.forEach((mission, index) => {
            // Simulate mission progress with controlled increments
            if (mission.progress < 100) {
                mission.progress = Math.min(100, mission.progress + Math.random() * 2);
            }
        });

        // Update progress bars
        const progressBars = document.querySelectorAll('.progress-fill');
        const progressTexts = document.querySelectorAll('.progress-text');
        
        progressBars.forEach((bar, index) => {
            if (this.missionData.activeMissions[index]) {
                const progress = Math.round(this.missionData.activeMissions[index].progress);
                bar.style.width = `${progress}%`;
                if (progressTexts[index]) {
                    progressTexts[index].textContent = `${progress}%`;
                }
            }
        });
    }

    updateDroneStatus() {
        // Simulate controlled battery drain
        this.missionData.droneFleet.forEach(drone => {
            if (drone.status === 'operational' && Math.random() < 0.05) {
                drone.battery = Math.max(0, Math.round(drone.battery - Math.random()));
            }
        });
    }

    updateTelemetry() {
        // Simulate real-time telemetry updates
        const timestamp = new Date().toLocaleTimeString();
        console.log(`Telemetry update: ${timestamp}`);
    }

    updateTimeDisplays() {
        const now = new Date();
        const timeElements = document.querySelectorAll('.time-display');
        timeElements.forEach(el => {
            el.textContent = now.toLocaleTimeString();
        });
    }

    updatePerformanceMetrics() {
        const metrics = this.missionData.fleetPerformance;
        
        // Simulate small variations in metrics with controlled precision
        const variation = (Math.random() - 0.5) * 0.1;
        metrics.successRate = Math.max(85, Math.min(100, metrics.successRate + variation));
        
        // Update display with fixed decimal places
        const successRateEl = document.querySelector('.metric-value');
        if (successRateEl && successRateEl.textContent.includes('%')) {
            successRateEl.textContent = `${metrics.successRate.toFixed(1)}%`;
        }
    }

    simulateBiometricScan() {
        const scanner = document.querySelector('.scanner-animation');
        if (scanner) {
            scanner.style.animation = 'scanPulse 0.5s infinite';
            
            setTimeout(() => {
                scanner.style.animation = 'scanPulse 2s infinite';
                this.showNotification('Biometric authentication successful', 'success');
            }, 3000);
        }
    }

    launchEmergencyMission() {
        this.showNotification('Emergency mission launched successfully!', 'success');
        
        // Add new mission to active missions
        const newMission = {
            id: `M-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
            droneId: "LA-006",
            type: "Emergency Response",
            priority: "critical",
            progress: 0,
            destination: "Emergency Zone",
            eta: this.calculateETA(15),
            payload: "Emergency medical supplies"
        };
        
        this.missionData.activeMissions.push(newMission);
        this.updateMissionCounter();
    }

    updateFilter(filter) {
        // Determine filter type and update current filters
        if (filter.startsWith('battery-')) {
            this.currentFilters.battery = filter;
        } else if (filter.startsWith('health-')) {
            this.currentFilters.health = filter;
        } else {
            this.currentFilters.status = filter;
        }
        
        this.applyFilters();
    }

    applyFilters() {
        const fleetItems = document.querySelectorAll('.fleet-item');
        const filteredDrones = [];
        
        fleetItems.forEach(item => {
            const droneId = item.querySelector('.fleet-id')?.textContent;
            const drone = this.missionData.droneFleet.find(d => d.id === droneId);
            
            if (drone && this.matchesFilters(drone)) {
                filteredDrones.push({ element: item, drone: drone });
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Sort the visible items
        this.sortFleetItems(filteredDrones);
    }

    matchesFilters(drone) {
        // Search filter
        if (this.searchQuery) {
            const searchText = `${drone.id} ${drone.name} ${drone.status}`.toLowerCase();
            if (!searchText.includes(this.searchQuery)) {
                return false;
            }
        }
        
        // Status filter
        if (this.currentFilters.status !== 'all' && drone.status !== this.currentFilters.status) {
            return false;
        }
        
        // Battery filter
        if (this.currentFilters.battery !== 'all') {
            const batteryLevel = drone.battery;
            switch (this.currentFilters.battery) {
                case 'battery-excellent':
                    if (batteryLevel < 75) return false;
                    break;
                case 'battery-good':
                    if (batteryLevel < 50 || batteryLevel >= 75) return false;
                    break;
                case 'battery-warning':
                    if (batteryLevel < 25 || batteryLevel >= 50) return false;
                    break;
                case 'battery-critical':
                    if (batteryLevel >= 25) return false;
                    break;
            }
        }
        
        // Health filter
        if (this.currentFilters.health !== 'all' && drone.systemMetrics) {
            const healthLevel = drone.systemMetrics.overallHealth;
            switch (this.currentFilters.health) {
                case 'health-excellent':
                    if (healthLevel < 90) return false;
                    break;
                case 'health-good':
                    if (healthLevel < 70 || healthLevel >= 90) return false;
                    break;
                case 'health-warning':
                    if (healthLevel < 50 || healthLevel >= 70) return false;
                    break;
                case 'health-critical':
                    if (healthLevel >= 50) return false;
                    break;
            }
        }
        
        return true;
    }

    sortFleetItems(filteredDrones) {
        filteredDrones.sort((a, b) => {
            let valueA, valueB;
            
            switch (this.sortBy) {
                case 'id':
                    valueA = a.drone.id;
                    valueB = b.drone.id;
                    break;
                case 'name':
                    valueA = a.drone.name;
                    valueB = b.drone.name;
                    break;
                case 'battery':
                    valueA = a.drone.battery;
                    valueB = b.drone.battery;
                    break;
                case 'health':
                    valueA = a.drone.systemMetrics?.overallHealth || 0;
                    valueB = b.drone.systemMetrics?.overallHealth || 0;
                    break;
                case 'status':
                    valueA = a.drone.status;
                    valueB = b.drone.status;
                    break;
                case 'lastUpdate':
                    valueA = new Date(a.drone.telemetry?.lastUpdate || 0);
                    valueB = new Date(b.drone.telemetry?.lastUpdate || 0);
                    break;
                default:
                    valueA = a.drone.id;
                    valueB = b.drone.id;
            }
            
            if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        
        // Reorder DOM elements
        const fleetList = document.querySelector('.fleet-list');
        if (fleetList) {
            filteredDrones.forEach(({ element }) => {
                fleetList.appendChild(element);
            });
        }
    }

    filterFleet(filter) {
        // Legacy method for backward compatibility
        this.currentFilters.status = filter;
        this.applyFilters();
    }

    setActiveTool(tool) {
        this.activeTool = tool;
        const missionMap = document.querySelector('.mission-map');
        
        if (missionMap) {
            missionMap.className = `mission-map tool-${tool}`;
        }
    }

    addWaypoint(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        
        const waypoint = document.createElement('div');
        waypoint.className = 'waypoint-marker';
        waypoint.style.left = `${x}%`;
        waypoint.style.top = `${y}%`;
        waypoint.textContent = document.querySelectorAll('.waypoint-marker').length + 1;
        
        event.currentTarget.appendChild(waypoint);
        
        waypoint.addEventListener('click', () => {
            this.hapticFeedback();
            this.selectWaypoint(waypoint);
        });
        
        this.hapticFeedback();
        this.showNotification('Waypoint added', 'info');
    }

    selectWaypoint(waypoint) {
        document.querySelectorAll('.waypoint-marker').forEach(wp => {
            wp.classList.remove('selected');
        });
        waypoint.classList.add('selected');
    }

    toggleMapLayer(layer) {
        const mapOverlay = document.querySelector('.map-overlay');
        if (!mapOverlay) return;
        
        const markers = mapOverlay.querySelectorAll('[class*="-marker"]');
        
        // Hide all markers first
        markers.forEach(marker => {
            marker.style.display = 'none';
        });
        
        // Show relevant markers based on selected layer
        switch (layer) {
            case 'tactical':
                mapOverlay.querySelectorAll('.friendly-marker').forEach(m => m.style.display = 'block');
                break;
            case 'threats':
                mapOverlay.querySelectorAll('.threat-marker').forEach(m => m.style.display = 'block');
                break;
            case 'medical':
                mapOverlay.querySelectorAll('.medical-marker').forEach(m => m.style.display = 'block');
                break;
            case 'terrain':
                mapOverlay.querySelectorAll('.landing-marker').forEach(m => m.style.display = 'block');
                break;
        }
    }

    showDroneDetails(droneId) {
        const drone = this.missionData.droneFleet.find(d => d.id === droneId);
        if (drone) {
            this.showNotification(`Drone ${drone.id} - ${drone.name}: ${drone.status.toUpperCase()}`, 'info');
        }
    }

    showMissionDetails(missionElement) {
        const missionId = missionElement.querySelector('.mission-id')?.textContent;
        this.showNotification(`Mission ${missionId} details displayed`, 'info');
    }

    showInventoryDetails(inventoryElement) {
        const itemName = inventoryElement.querySelector('.item-name')?.textContent;
        this.showNotification(`Inventory item: ${itemName}`, 'info');
    }

    updateMissionCounter() {
        const counter = document.querySelector('.mission-number');
        if (counter) {
            counter.textContent = this.missionData.activeMissions.length;
        }
    }

    updateFleetDetails() {
        // Update detailed fleet information when fleet screen is active
        if (this.currentScreen === 'fleet') {
            this.missionData.droneFleet.forEach(drone => {
                const fleetItems = document.querySelectorAll('.fleet-item');
                fleetItems.forEach(item => {
                    const fleetId = item.querySelector('.fleet-id')?.textContent;
                    if (fleetId === drone.id) {
                        this.updateFleetItemData(item, drone);
                    }
                });
            });
        }
    }

    updateFleetItemData(item, drone) {
        const detailRows = item.querySelectorAll('.detail-row');
        detailRows.forEach(row => {
            const label = row.querySelector('.detail-label')?.textContent;
            const valueEl = row.querySelector('.detail-value');
            
            if (label === 'Battery:' && valueEl) {
                const remainingTime = this.calculateBatteryTime(drone.battery);
                valueEl.textContent = `${Math.round(drone.battery)}% (${remainingTime}h remaining)`;
            }
        });
    }

    updateMissionPlanning() {
        // Update mission planning data and calculations
        this.calculateMissionMetrics();
    }

    updateInventoryData() {
        // Update inventory status and alerts
        this.checkInventoryLevels();
    }

    updateTacticalMap() {
        // Update tactical mapping information
        this.refreshMapData();
        this.updateDroneMarkers();
        this.updateMapStatistics();
        this.updateFlightPaths();
    }

    calculateMissionMetrics() {
        const metricRows = document.querySelectorAll('.metric-row');
        metricRows.forEach(row => {
            const label = row.children[0]?.textContent;
            const valueEl = row.children[1];
            
            if (label === 'Estimated Duration:' && valueEl) {
                const duration = 20 + Math.random() * 10;
                valueEl.textContent = `${Math.round(duration)} minutes`;
            }
        });
    }

    checkInventoryLevels() {
        // Check for low inventory and update alerts
        const criticalItems = document.querySelectorAll('.inventory-item.critical');
        if (criticalItems.length > 0) {
            this.showNotification(`${criticalItems.length} items require immediate attention`, 'warning');
        }
    }

    refreshMapData() {
        // Refresh tactical map with latest intelligence
        console.log('Tactical map data refreshed');
        this.setupTacticalMapping();
    }

    setupTacticalMapping() {
        // Initialize tactical mapping interface
        this.mapZoom = 1;
        this.mapOffsetX = 0;
        this.mapOffsetY = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.activeLayer = 'tactical';
        
        // Setup map controls
        this.setupMapControls();
        
        // Setup layer toggles
        this.setupLayerToggles();
        
        // Setup drone tracking
        this.setupDroneTracking();
        
        // Setup map interactions
        this.setupMapInteractions();
        
        // Initialize map with satellite imagery
        this.loadSatelliteMap();
    }

    setupMapControls() {
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        const resetViewBtn = document.getElementById('reset-view');
        const fullscreenBtn = document.getElementById('fullscreen');
        
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => this.zoomMap(1.2));
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => this.zoomMap(0.8));
        }
        
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => this.resetMapView());
        }
        
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
    }

    setupLayerToggles() {
        const layerButtons = document.querySelectorAll('.layer-btn');
        layerButtons.forEach(button => {
            button.addEventListener('click', () => {
                layerButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const layer = button.dataset.layer;
                this.switchMapLayer(layer);
            });
        });
    }

    setupDroneTracking() {
        // Initialize drone positions and tracking
        this.dronePositions = new Map();
        this.flightPaths = new Map();
        
        // Simulate drone positions based on fleet data
        this.missionData.droneFleet.forEach(drone => {
            this.dronePositions.set(drone.id, {
                x: Math.random() * 80 + 10, // 10-90% of map width
                y: Math.random() * 80 + 10, // 10-90% of map height
                status: drone.status,
                battery: drone.battery,
                mission: drone.currentMission || null,
                lastUpdate: Date.now()
            });
        });
        
        // Start real-time updates
        this.startDroneTracking();
    }

    setupMapInteractions() {
        const mapElement = document.getElementById('tactical-map');
        if (!mapElement) return;
        
        // Mouse events for desktop
        mapElement.addEventListener('mousedown', (e) => this.startDrag(e));
        mapElement.addEventListener('mousemove', (e) => this.drag(e));
        mapElement.addEventListener('mouseup', () => this.endDrag());
        mapElement.addEventListener('mouseleave', () => this.endDrag());
        
        // Touch events for mobile
        mapElement.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        mapElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.drag(e.touches[0]);
        });
        mapElement.addEventListener('touchend', () => this.endDrag());
        
        // Wheel zoom
        mapElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoomMap(delta);
        });
        
        // Click to get coordinates
        mapElement.addEventListener('click', (e) => this.updateCoordinates(e));
    }

    loadSatelliteMap() {
        // Load satellite imagery (using placeholder for demo)
        const mapImage = document.getElementById('satellite-image');
        if (mapImage) {
            // In a real implementation, you would use a mapping service like Google Maps, Mapbox, etc.
            // For demo purposes, we'll use a placeholder
            mapImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMzAyZiIvPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2F0ZWxsaXRlIE1hcCBWaWV3PC90ZXh0Pgo8L3N2Zz4K';
        }
    }

    zoomMap(factor) {
        this.mapZoom = Math.max(0.5, Math.min(3, this.mapZoom * factor));
        this.updateMapTransform();
    }

    resetMapView() {
        this.mapZoom = 1;
        this.mapOffsetX = 0;
        this.mapOffsetY = 0;
        this.updateMapTransform();
    }

    toggleFullscreen() {
        const mapElement = document.getElementById('tactical-map');
        if (!mapElement) return;
        
        if (mapElement.classList.contains('fullscreen')) {
            mapElement.classList.remove('fullscreen');
            document.exitFullscreen?.();
        } else {
            mapElement.classList.add('fullscreen');
            mapElement.requestFullscreen?.();
        }
    }

    updateMapTransform() {
        const mapElement = document.getElementById('tactical-map');
        if (!mapElement) return;
        
        mapElement.style.transform = `translate(${this.mapOffsetX}px, ${this.mapOffsetY}px) scale(${this.mapZoom})`;
    }

    startDrag(e) {
        this.isDragging = true;
        this.dragStartX = e.clientX - this.mapOffsetX;
        this.dragStartY = e.clientY - this.mapOffsetY;
    }

    drag(e) {
        if (!this.isDragging) return;
        
        this.mapOffsetX = e.clientX - this.dragStartX;
        this.mapOffsetY = e.clientY - this.dragStartY;
        this.updateMapTransform();
    }

    endDrag() {
        this.isDragging = false;
    }

    switchMapLayer(layer) {
        this.activeLayer = layer;
        
        // Update map background based on layer
        const mapImage = document.getElementById('satellite-image');
        if (mapImage) {
            switch (layer) {
                case 'satellite':
                    mapImage.style.opacity = '0.8';
                    break;
                case 'terrain':
                    mapImage.style.opacity = '0.6';
                    break;
                case 'tactical':
                    mapImage.style.opacity = '0.4';
                    break;
                default:
                    mapImage.style.opacity = '0.3';
            }
        }
        
        // Show/hide layer-specific elements
        this.updateLayerVisibility(layer);
    }

    updateLayerVisibility(layer) {
        const elements = {
            threats: document.querySelectorAll('.threat-marker'),
            medical: document.querySelectorAll('.medical-marker'),
            friendly: document.querySelectorAll('.friendly-marker'),
            landing: document.querySelectorAll('.landing-marker')
        };
        
        Object.keys(elements).forEach(key => {
            elements[key].forEach(el => {
                if (layer === 'tactical' || layer === key) {
                    el.style.display = 'flex';
                } else {
                    el.style.display = 'none';
                }
            });
        });
    }

    updateDroneMarkers() {
        const droneMarkersContainer = document.getElementById('drone-markers');
        if (!droneMarkersContainer) return;
        
        // Clear existing markers
        droneMarkersContainer.innerHTML = '';
        
        // Create markers for each drone
        this.dronePositions.forEach((position, droneId) => {
            const marker = this.createDroneMarker(droneId, position);
            droneMarkersContainer.appendChild(marker);
        });
        
        // Update drone list in sidebar
        this.updateDroneList();
    }

    createDroneMarker(droneId, position) {
        const marker = document.createElement('div');
        marker.className = `drone-marker ${position.status}`;
        marker.style.left = `${position.x}%`;
        marker.style.top = `${position.y}%`;
        marker.dataset.droneId = droneId;
        
        // Add drone number
        const droneNumber = droneId.replace('DRONE-', '');
        marker.textContent = droneNumber;
        
        // Add hover info
        const info = document.createElement('div');
        info.className = 'drone-info';
        info.innerHTML = `
            <div>${droneId}</div>
            <div>Battery: ${position.battery}%</div>
            <div>Status: ${position.status}</div>
            ${position.mission ? `<div>Mission: ${position.mission}</div>` : ''}
        `;
        marker.appendChild(info);
        
        // Add click handler
        marker.addEventListener('click', () => this.selectDrone(droneId));
        
        return marker;
    }

    updateDroneList() {
        const droneList = document.getElementById('drone-list');
        if (!droneList) return;
        
        droneList.innerHTML = '';
        
        this.dronePositions.forEach((position, droneId) => {
            const item = document.createElement('div');
            item.className = 'drone-status-item';
            item.dataset.droneId = droneId;
            
            item.innerHTML = `
                <div class="drone-status-icon ${position.status}"></div>
                <div class="drone-status-info">
                    <div class="drone-status-id">${droneId}</div>
                    <div class="drone-status-details">${position.battery}% • ${position.status}</div>
                </div>
            `;
            
            item.addEventListener('click', () => this.selectDrone(droneId));
            droneList.appendChild(item);
        });
    }

    updateMapStatistics() {
        const activeDronesCount = document.getElementById('active-drones-count');
        const activeMissionsCount = document.getElementById('active-missions-count');
        const threatLevel = document.getElementById('threat-level');
        
        if (activeDronesCount) {
            const activeCount = Array.from(this.dronePositions.values())
                .filter(pos => pos.status === 'operational' || pos.status === 'mission').length;
            activeDronesCount.textContent = activeCount;
        }
        
        if (activeMissionsCount) {
            const missionCount = Array.from(this.dronePositions.values())
                .filter(pos => pos.mission).length;
            activeMissionsCount.textContent = missionCount;
        }
        
        if (threatLevel) {
            // Simulate threat level based on drone status
            const offlineCount = Array.from(this.dronePositions.values())
                .filter(pos => pos.status === 'offline').length;
            
            if (offlineCount > 2) {
                threatLevel.textContent = 'High';
                threatLevel.className = 'stat-value threat-high';
            } else if (offlineCount > 0) {
                threatLevel.textContent = 'Medium';
                threatLevel.className = 'stat-value threat-medium';
            } else {
                threatLevel.textContent = 'Low';
                threatLevel.className = 'stat-value threat-low';
            }
        }
    }

    updateFlightPaths() {
        const flightPathsContainer = document.getElementById('flight-paths');
        if (!flightPathsContainer) return;
        
        flightPathsContainer.innerHTML = '';
        
        // Create flight paths for drones on missions
        this.dronePositions.forEach((position, droneId) => {
            if (position.mission && position.status === 'mission') {
                const path = this.createFlightPath(droneId, position);
                flightPathsContainer.appendChild(path);
            }
        });
    }

    createFlightPath(droneId, position) {
        const path = document.createElement('div');
        path.className = 'flight-path';
        path.dataset.droneId = droneId;
        
        // Create a simple path from current position to mission destination
        const angle = Math.random() * 360;
        const length = 50 + Math.random() * 100;
        
        path.style.left = `${position.x}%`;
        path.style.top = `${position.y}%`;
        path.style.width = `${length}px`;
        path.style.transform = `rotate(${angle}deg)`;
        path.style.transformOrigin = '0 50%';
        
        return path;
    }

    startDroneTracking() {
        // Simulate real-time drone movement
        setInterval(() => {
            this.simulateDroneMovement();
            this.updateDroneMarkers();
            this.updateMapStatistics();
            this.updateFlightPaths();
        }, 2000); // Update every 2 seconds
    }

    simulateDroneMovement() {
        this.dronePositions.forEach((position, droneId) => {
            if (position.status === 'mission') {
                // Move drone slightly
                position.x += (Math.random() - 0.5) * 2;
                position.y += (Math.random() - 0.5) * 2;
                
                // Keep within bounds
                position.x = Math.max(5, Math.min(95, position.x));
                position.y = Math.max(5, Math.min(95, position.y));
                
                // Update battery
                position.battery = Math.max(0, position.battery - Math.random() * 2);
                
                // Update timestamp
                position.lastUpdate = Date.now();
            }
        });
    }

    selectDrone(droneId) {
        // Highlight selected drone
        document.querySelectorAll('.drone-marker').forEach(marker => {
            marker.classList.remove('selected');
        });
        
        const selectedMarker = document.querySelector(`[data-drone-id="${droneId}"]`);
        if (selectedMarker) {
            selectedMarker.classList.add('selected');
        }
        
        // Show drone details
        const position = this.dronePositions.get(droneId);
        if (position) {
            this.showNotification(`Selected ${droneId}: ${position.status} (${position.battery}% battery)`, 'info');
        }
    }

    updateCoordinates(e) {
        const mapElement = document.getElementById('tactical-map');
        const coordinatesDisplay = document.getElementById('coordinates-display');
        
        if (!mapElement || !coordinatesDisplay) return;
        
        const rect = mapElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Convert to approximate lat/lng (demo coordinates)
        const lat = 40.7128 + (y - 50) * 0.01;
        const lng = -74.0060 + (x - 50) * 0.01;
        
        coordinatesDisplay.textContent = `Lat: ${lat.toFixed(4)}°N, Lng: ${lng.toFixed(4)}°W`;
    }

    calculateETA(minutes) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        return now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    calculateBatteryTime(batteryPercent) {
        const maxFlightTime = 3; // hours
        return ((batteryPercent / 100) * maxFlightTime).toFixed(1);
    }

    getBatteryClass(battery) {
        if (battery >= 75) return 'excellent';
        if (battery >= 50) return 'good';
        if (battery >= 25) return 'warning';
        return 'critical';
    }

    getSignalClass(signal) {
        if (signal >= 90) return 'excellent';
        if (signal >= 70) return 'good';
        if (signal >= 30) return 'poor';
        return 'offline';
    }

    // Fleet status and mission status updates
    updateFleetStatus() {
        console.log('Fleet status updated');
    }

    updateMissionStatus() {
        console.log('Mission status updated');
    }

    updateInventoryStatus() {
        console.log('Inventory status updated');
    }

    hapticFeedback(type = 'light') {
        // Simulate haptic feedback
        if ('vibrate' in navigator) {
            switch (type) {
                case 'light':
                    navigator.vibrate(10);
                    break;
                case 'medium':
                    navigator.vibrate(20);
                    break;
                case 'heavy':
                    navigator.vibrate([50, 10, 50]);
                    break;
            }
        }
    }

    setupDroneActionButtons() {
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                this.hapticFeedback();
                
                const action = button.dataset.action;
                const droneCard = button.closest('.drone-card');
                const droneId = droneCard?.dataset.drone;
                
                this.handleDroneAction(action, droneId);
            });
        });
    }

    setupDroneVisualizations() {
        const droneModels = document.querySelectorAll('.drone-3d-model');
        droneModels.forEach(model => {
            // Add hover effects
            model.addEventListener('mouseenter', () => {
                model.style.animationPlayState = 'paused';
                model.style.transform = 'scale(1.1) rotateY(10deg)';
            });
            
            model.addEventListener('mouseleave', () => {
                model.style.animationPlayState = 'running';
                model.style.transform = '';
            });
            
            // Add click interaction
            model.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hapticFeedback('medium');
                this.showDrone3DView(model);
            });
        });
    }

    handleDroneAction(action, droneId) {
        switch (action) {
            case 'details':
                this.showEnhancedDroneDetails(droneId);
                break;
            case 'control':
                this.showDroneControlInterface(droneId);
                break;
            case 'mission':
                this.showDroneMissionInterface(droneId);
                break;
            default:
                console.log(`Unknown action: ${action}`);
        }
    }

    showEnhancedDroneDetails(droneId) {
        const drone = this.missionData.droneFleet.find(d => d.id === droneId);
        if (!drone) return;

        // Create enhanced details modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(17, 24, 39, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            backdrop-filter: blur(10px);
        `;

        const content = document.createElement('div');
        content.className = 'enhanced-drone-modal';
        content.style.cssText = `
            background: var(--command-blue);
            border: 2px solid var(--tactical-green);
            border-radius: var(--radius-lg);
            padding: var(--space-24);
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        content.innerHTML = `
            <div class="modal-header">
                <h3>${drone.name} - Enhanced Details</h3>
                <button class="close-btn" style="background: none; border: none; color: var(--arctic-white); font-size: 24px; cursor: pointer;">×</button>
            </div>
            <div class="modal-content">
                <div class="drone-overview">
                    <div class="overview-item">
                        <span class="label">Status:</span>
                        <span class="value status-${drone.status}">${drone.status.toUpperCase()}</span>
                    </div>
                    <div class="overview-item">
                        <span class="label">Battery:</span>
                        <span class="value">${drone.battery}%</span>
                    </div>
                    <div class="overview-item">
                        <span class="label">Flight Hours:</span>
                        <span class="value">${drone.flightHours} hours</span>
                    </div>
                    <div class="overview-item">
                        <span class="label">Last Maintenance:</span>
                        <span class="value">${drone.lastMaintenance}</span>
                    </div>
                </div>
                <div class="system-health-details">
                    <h4>System Health Breakdown</h4>
                    <div class="health-details">
                        <div class="health-detail-item">
                            <span class="health-label">Motor Health:</span>
                            <div class="health-bar">
                                <div class="health-fill" style="width: ${drone.systemMetrics.motorHealth}%"></div>
                            </div>
                            <span class="health-value">${drone.systemMetrics.motorHealth}%</span>
                        </div>
                        <div class="health-detail-item">
                            <span class="health-label">Battery Health:</span>
                            <div class="health-bar">
                                <div class="health-fill" style="width: ${drone.systemMetrics.batteryHealth}%"></div>
                            </div>
                            <span class="health-value">${drone.systemMetrics.batteryHealth}%</span>
                        </div>
                        <div class="health-detail-item">
                            <span class="health-label">Communication:</span>
                            <div class="health-bar">
                                <div class="health-fill" style="width: ${drone.systemMetrics.communicationHealth}%"></div>
                            </div>
                            <span class="health-value">${drone.systemMetrics.communicationHealth}%</span>
                        </div>
                        <div class="health-detail-item">
                            <span class="health-label">Navigation:</span>
                            <div class="health-bar">
                                <div class="health-fill" style="width: ${drone.systemMetrics.navigationHealth}%"></div>
                            </div>
                            <span class="health-value">${drone.systemMetrics.navigationHealth}%</span>
                        </div>
                    </div>
                </div>
                <div class="telemetry-details">
                    <h4>Current Telemetry</h4>
                    <div class="telemetry-grid">
                        <div class="telemetry-item">
                            <span class="telemetry-label">Speed:</span>
                            <span class="telemetry-value">${drone.telemetry.speed} km/h</span>
                        </div>
                        <div class="telemetry-item">
                            <span class="telemetry-label">Altitude:</span>
                            <span class="telemetry-value">${drone.telemetry.altitude}m</span>
                        </div>
                        <div class="telemetry-item">
                            <span class="telemetry-label">Temperature:</span>
                            <span class="telemetry-value">${drone.telemetry.temperature}°C</span>
                        </div>
                        <div class="telemetry-item">
                            <span class="telemetry-label">Signal Strength:</span>
                            <span class="telemetry-value">${drone.telemetry.signalStrength}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Close functionality
        const closeBtn = content.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    showDroneControlInterface(droneId) {
        this.showNotification(`Opening control interface for ${droneId}...`, 'info');
        // TODO: Implement drone control interface
    }

    showDroneMissionInterface(droneId) {
        this.showNotification(`Opening mission interface for ${droneId}...`, 'info');
        // TODO: Implement mission interface
    }

    showDrone3DView(model) {
        this.showNotification('3D drone view activated', 'info');
        // TODO: Implement 3D drone view
    }

    setupDataVisualization() {
        // Initialize performance chart
        this.initializePerformanceChart();
        
        // Setup chart interactions
        this.setupChartInteractions();
    }

    initializePerformanceChart() {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Chart data (simulated 30-day performance)
        const data = this.generatePerformanceData();
        
        // Draw chart
        this.drawPerformanceChart(ctx, width, height, data);
    }

    generatePerformanceData() {
        // Generate 30 days of performance data
        const data = [];
        const today = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            data.push({
                date: date,
                reliability: 90 + Math.random() * 10,
                successRate: 85 + Math.random() * 15,
                responseTime: 5 + Math.random() * 10
            });
        }
        
        return data;
    }

    drawPerformanceChart(ctx, width, height, data) {
        const padding = 40;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 0; i <= 6; i++) {
            const x = padding + (chartWidth / 6) * i;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 4; i++) {
            const y = padding + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Draw reliability line
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = height - padding - (point.reliability / 100) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw success rate line
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = height - padding - (point.successRate / 100) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw data points
        data.forEach((point, index) => {
            const x = padding + (chartWidth / (data.length - 1)) * index;
            const y = height - padding - (point.reliability / 100) * chartHeight;
            
            // Reliability point
            ctx.fillStyle = '#10B981';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Success rate point
            const successY = height - padding - (point.successRate / 100) * chartHeight;
            ctx.fillStyle = '#3B82F6';
            ctx.beginPath();
            ctx.arc(x, successY, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw legend
        ctx.fillStyle = '#F8FAFC';
        ctx.font = '12px Inter, sans-serif';
        
        // Reliability legend
        ctx.fillStyle = '#10B981';
        ctx.fillRect(width - 120, 20, 12, 3);
        ctx.fillStyle = '#F8FAFC';
        ctx.fillText('Reliability', width - 100, 30);
        
        // Success rate legend
        ctx.fillStyle = '#3B82F6';
        ctx.fillRect(width - 120, 35, 12, 3);
        ctx.fillStyle = '#F8FAFC';
        ctx.fillText('Success Rate', width - 100, 45);
        
        // Y-axis labels
        ctx.fillStyle = 'rgba(248, 250, 252, 0.6)';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'right';
        
        for (let i = 0; i <= 4; i++) {
            const value = 100 - (i * 25);
            const y = padding + (chartHeight / 4) * i;
            ctx.fillText(`${value}%`, padding - 10, y + 4);
        }
        
        // X-axis labels (dates)
        ctx.textAlign = 'center';
        const lastDate = data[data.length - 1].date;
        const firstDate = data[0].date;
        
        ctx.fillText(firstDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), padding, height - 10);
        ctx.fillText(lastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), width - padding, height - 10);
    }

    setupChartInteractions() {
        const chartWrapper = document.querySelector('.chart-wrapper');
        if (!chartWrapper) return;

        // Add hover effect
        chartWrapper.addEventListener('mouseenter', () => {
            chartWrapper.style.background = 'rgba(75, 85, 99, 0.2)';
        });

        chartWrapper.addEventListener('mouseleave', () => {
            chartWrapper.style.background = 'rgba(75, 85, 99, 0.1)';
        });

        // Add click interaction
        chartWrapper.addEventListener('click', () => {
            this.hapticFeedback();
            this.showDetailedAnalytics();
        });
    }

    showDetailedAnalytics() {
        this.showNotification('Opening detailed analytics view...', 'info');
        // TODO: Implement detailed analytics modal
    }

    setupDroneControlInterface() {
        // Setup drone selection
        this.setupDroneSelection();
        
        // Setup flight controls
        this.setupFlightControls();
        
        // Setup payload controls
        this.setupPayloadControls();
        
        // Setup mission commands
        this.setupMissionCommands();
    }

    setupDroneSelection() {
        const droneSelect = document.getElementById('control-drone-select');
        if (droneSelect) {
            droneSelect.addEventListener('change', (e) => {
                this.hapticFeedback();
                const selectedDrone = e.target.value;
                this.updateControlInterface(selectedDrone);
                this.showNotification(`Selected ${selectedDrone} for control`, 'info');
            });
        }
    }

    setupFlightControls() {
        // Altitude slider
        const altitudeSlider = document.getElementById('altitude-slider');
        const altitudeValue = altitudeSlider?.parentElement.querySelector('.slider-value');
        
        if (altitudeSlider && altitudeValue) {
            altitudeSlider.addEventListener('input', (e) => {
                this.hapticFeedback('light');
                const value = e.target.value;
                altitudeValue.textContent = `${value}m`;
                this.sendFlightCommand('altitude', value);
            });
        }

        // Speed slider
        const speedSlider = document.getElementById('speed-slider');
        const speedValue = speedSlider?.parentElement.querySelector('.slider-value');
        
        if (speedSlider && speedValue) {
            speedSlider.addEventListener('input', (e) => {
                this.hapticFeedback('light');
                const value = e.target.value;
                speedValue.textContent = `${value} km/h`;
                this.sendFlightCommand('speed', value);
            });
        }

        // Heading slider
        const headingSlider = document.getElementById('heading-slider');
        const headingValue = headingSlider?.parentElement.querySelector('.slider-value');
        
        if (headingSlider && headingValue) {
            headingSlider.addEventListener('input', (e) => {
                this.hapticFeedback('light');
                const value = e.target.value;
                headingValue.textContent = `${value}°`;
                this.sendFlightCommand('heading', value);
            });
        }
    }

    setupPayloadControls() {
        const payloadButtons = document.querySelectorAll('.payload-btn');
        payloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.hapticFeedback();
                const action = button.dataset.action;
                const payloadName = button.closest('.payload-item').querySelector('.payload-name').textContent;
                this.handlePayloadAction(action, payloadName);
            });
        });
    }

    setupMissionCommands() {
        const commandButtons = document.querySelectorAll('.command-btn');
        commandButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.hapticFeedback('medium');
                const command = button.dataset.command;
                this.handleMissionCommand(command);
            });
        });
    }

    updateControlInterface(droneId) {
        const drone = this.missionData.droneFleet.find(d => d.id === droneId);
        if (!drone) return;

        // Update status display
        const statusItems = document.querySelectorAll('.status-item');
        statusItems.forEach(item => {
            const label = item.querySelector('.status-label').textContent;
            const valueEl = item.querySelector('.status-value');
            
            switch (label) {
                case 'Battery:':
                    valueEl.textContent = `${drone.battery}%`;
                    valueEl.className = `status-value battery-${this.getBatteryClass(drone.battery)}`;
                    break;
                case 'Signal:':
                    valueEl.textContent = `${drone.telemetry.signalStrength}%`;
                    valueEl.className = `status-value signal-${this.getSignalClass(drone.telemetry.signalStrength)}`;
                    break;
                case 'GPS:':
                    valueEl.textContent = `${drone.telemetry.gpsAccuracy}m accuracy`;
                    break;
                case 'Mode:':
                    valueEl.textContent = drone.status === 'operational' ? 'AUTO' : 'MANUAL';
                    break;
            }
        });

        // Update sliders
        const altitudeSlider = document.getElementById('altitude-slider');
        const speedSlider = document.getElementById('speed-slider');
        const headingSlider = document.getElementById('heading-slider');

        if (altitudeSlider) {
            altitudeSlider.value = drone.telemetry.altitude;
            altitudeSlider.parentElement.querySelector('.slider-value').textContent = `${drone.telemetry.altitude}m`;
        }

        if (speedSlider) {
            speedSlider.value = drone.telemetry.speed;
            speedSlider.parentElement.querySelector('.slider-value').textContent = `${drone.telemetry.speed} km/h`;
        }

        if (headingSlider) {
            headingSlider.value = drone.telemetry.heading;
            headingSlider.parentElement.querySelector('.slider-value').textContent = `${drone.telemetry.heading}°`;
        }
    }

    sendFlightCommand(parameter, value) {
        const droneSelect = document.getElementById('control-drone-select');
        const selectedDrone = droneSelect?.value;
        
        if (selectedDrone) {
            console.log(`Sending ${parameter} command to ${selectedDrone}: ${value}`);
            // TODO: Implement actual command sending to drone
        }
    }

    handlePayloadAction(action, payloadName) {
        const droneSelect = document.getElementById('control-drone-select');
        const selectedDrone = droneSelect?.value;
        
        if (selectedDrone) {
            this.showNotification(`${action}ing ${payloadName} for ${selectedDrone}...`, 'info');
            // TODO: Implement actual payload control
        }
    }

    handleMissionCommand(command) {
        const droneSelect = document.getElementById('control-drone-select');
        const selectedDrone = droneSelect?.value;
        
        if (!selectedDrone) {
            this.showNotification('Please select a drone first', 'warning');
            return;
        }

        switch (command) {
            case 'takeoff':
                this.showNotification(`Initiating takeoff for ${selectedDrone}...`, 'info');
                break;
            case 'land':
                this.showNotification(`Initiating landing for ${selectedDrone}...`, 'info');
                break;
            case 'hover':
                this.showNotification(`Setting ${selectedDrone} to hover mode...`, 'info');
                break;
            case 'return':
                this.showNotification(`Initiating return to base for ${selectedDrone}...`, 'warning');
                break;
            case 'emergency':
                this.showNotification(`EMERGENCY STOP initiated for ${selectedDrone}!`, 'error');
                break;
            default:
                this.showNotification(`Unknown command: ${command}`, 'warning');
        }
        
        // TODO: Implement actual mission command sending
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--command-blue);
            color: var(--arctic-white);
            padding: 12px 20px;
            border-radius: 8px;
            border-left: 4px solid var(--tactical-green);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            font-size: 14px;
            font-weight: 500;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        if (type === 'warning') {
            notification.style.borderLeftColor = 'var(--warning-amber)';
        } else if (type === 'error') {
            notification.style.borderLeftColor = 'var(--alert-red)';
        } else if (type === 'success') {
            notification.style.borderLeftColor = 'var(--communication-green)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // ===== FLEET HEALTH MONITORING SYSTEM =====
    initializeFleetHealthMonitoring() {
        this.fleetHealthData = {
            overallHealth: 0,
            criticalAlerts: [],
            warnings: [],
            healthTrends: [],
            lastUpdate: new Date()
        };

        // Start real-time health monitoring
        this.startHealthMonitoring();
        
        // Initialize health dashboard
        this.initializeHealthDashboard();
        
        // Setup health alerts
        this.setupHealthAlerts();
    }

    startHealthMonitoring() {
        // Monitor fleet health every 5 seconds
        setInterval(() => {
            this.updateFleetHealthMetrics();
            this.analyzeHealthTrends();
            this.checkHealthThresholds();
            this.updateHealthDashboard();
        }, 5000);

        // Deep health analysis every 30 seconds
        setInterval(() => {
            this.performDeepHealthAnalysis();
        }, 30000);
    }

    updateFleetHealthMetrics() {
        const drones = this.missionData.droneFleet;
        let totalHealth = 0;
        let operationalCount = 0;
        const healthBreakdown = {
            excellent: 0,
            good: 0,
            warning: 0,
            critical: 0
        };

        drones.forEach(drone => {
            if (drone.systemMetrics && drone.systemMetrics.overallHealth) {
                const health = drone.systemMetrics.overallHealth;
                totalHealth += health;
                operationalCount++;

                // Categorize health levels
                if (health >= 90) healthBreakdown.excellent++;
                else if (health >= 70) healthBreakdown.good++;
                else if (health >= 50) healthBreakdown.warning++;
                else healthBreakdown.critical++;
            }
        });

        this.fleetHealthData.overallHealth = operationalCount > 0 ? totalHealth / operationalCount : 0;
        this.fleetHealthData.healthBreakdown = healthBreakdown;
        this.fleetHealthData.operationalCount = operationalCount;
        this.fleetHealthData.lastUpdate = new Date();
    }

    analyzeHealthTrends() {
        const currentHealth = this.fleetHealthData.overallHealth;
        
        // Add to trends (keep last 20 data points)
        this.fleetHealthData.healthTrends.push({
            timestamp: new Date(),
            health: currentHealth
        });

        if (this.fleetHealthData.healthTrends.length > 20) {
            this.fleetHealthData.healthTrends.shift();
        }

        // Calculate trend direction
        if (this.fleetHealthData.healthTrends.length >= 3) {
            const recent = this.fleetHealthData.healthTrends.slice(-3);
            const trend = recent[2].health - recent[0].health;
            
            this.fleetHealthData.trend = trend > 1 ? 'improving' : 
                                       trend < -1 ? 'declining' : 'stable';
        }
    }

    checkHealthThresholds() {
        const drones = this.missionData.droneFleet;
        
        drones.forEach(drone => {
            if (drone.systemMetrics) {
                const health = drone.systemMetrics.overallHealth;
                
                // Check for critical health issues
                if (health < 30 && !this.fleetHealthData.criticalAlerts.find(alert => alert.droneId === drone.id)) {
                    this.fleetHealthData.criticalAlerts.push({
                        droneId: drone.id,
                        droneName: drone.name,
                        health: health,
                        timestamp: new Date(),
                        type: 'critical_health',
                        message: `Critical health level: ${health}%`
                    });
                    
                    this.showNotification(`CRITICAL: ${drone.name} health at ${health}%`, 'error');
                }

                // Check for warning conditions
                if (health < 60 && health >= 30 && !this.fleetHealthData.warnings.find(warning => warning.droneId === drone.id)) {
                    this.fleetHealthData.warnings.push({
                        droneId: drone.id,
                        droneName: drone.name,
                        health: health,
                        timestamp: new Date(),
                        type: 'health_warning',
                        message: `Health warning: ${health}%`
                    });
                    
                    this.showNotification(`WARNING: ${drone.name} health at ${health}%`, 'warning');
                }

                // Check individual system health
                Object.entries(drone.systemMetrics).forEach(([system, health]) => {
                    if (system !== 'overallHealth' && health < 50) {
                        const alertKey = `${drone.id}_${system}`;
                        if (!this.fleetHealthData.criticalAlerts.find(alert => alert.key === alertKey)) {
                            this.fleetHealthData.criticalAlerts.push({
                                key: alertKey,
                                droneId: drone.id,
                                droneName: drone.name,
                                system: system,
                                health: health,
                                timestamp: new Date(),
                                type: 'system_failure',
                                message: `${system} system critical: ${health}%`
                            });
                            
                            this.showNotification(`SYSTEM FAILURE: ${drone.name} ${system} at ${health}%`, 'error');
                        }
                    }
                });
            }
        });
    }

    performDeepHealthAnalysis() {
        const drones = this.missionData.droneFleet;
        
        drones.forEach(drone => {
            if (drone.systemMetrics) {
                // Analyze battery degradation patterns
                this.analyzeBatteryHealth(drone);
                
                // Analyze motor wear patterns
                this.analyzeMotorHealth(drone);
                
                // Analyze communication stability
                this.analyzeCommunicationHealth(drone);
                
                // Predict maintenance needs
                this.predictMaintenanceNeeds(drone);
            }
        });
    }

    analyzeBatteryHealth(drone) {
        const batteryHealth = drone.systemMetrics.batteryHealth;
        const batteryLevel = drone.battery;
        
        // Check for battery degradation patterns
        if (batteryHealth < 80 && batteryLevel < 20) {
            this.addHealthAlert(drone, 'battery_degradation', 
                `Battery degradation detected. Health: ${batteryHealth}%, Level: ${batteryLevel}%`);
        }
    }

    analyzeMotorHealth(drone) {
        const motorHealth = drone.systemMetrics.motorHealth;
        const vibration = drone.telemetry?.vibration || 0;
        
        // Check for motor wear indicators
        if (motorHealth < 85 && vibration > 0.5) {
            this.addHealthAlert(drone, 'motor_wear', 
                `Motor wear detected. Health: ${motorHealth}%, Vibration: ${vibration}g`);
        }
    }

    analyzeCommunicationHealth(drone) {
        const commHealth = drone.systemMetrics.communicationHealth;
        const signalStrength = drone.telemetry?.signalStrength || 0;
        
        // Check for communication issues
        if (commHealth < 70 && signalStrength < 50) {
            this.addHealthAlert(drone, 'communication_issues', 
                `Communication issues detected. Health: ${commHealth}%, Signal: ${signalStrength}%`);
        }
    }

    predictMaintenanceNeeds(drone) {
        const health = drone.systemMetrics.overallHealth;
        const flightHours = drone.flightHours || 0;
        
        // Predict maintenance based on health and usage
        if (health < 75 || flightHours > 150) {
            const predictedDate = new Date();
            predictedDate.setDate(predictedDate.getDate() + 7); // Predict 7 days ahead
            
            this.addMaintenancePrediction(drone, predictedDate, health, flightHours);
        }
    }

    addHealthAlert(drone, type, message) {
        const alertKey = `${drone.id}_${type}`;
        
        if (!this.fleetHealthData.criticalAlerts.find(alert => alert.key === alertKey)) {
            this.fleetHealthData.criticalAlerts.push({
                key: alertKey,
                droneId: drone.id,
                droneName: drone.name,
                type: type,
                message: message,
                timestamp: new Date(),
                severity: 'high'
            });
        }
    }

    addMaintenancePrediction(drone, predictedDate, health, flightHours) {
        const predictionKey = `${drone.id}_maintenance`;
        
        if (!this.missionData.predictiveAnalytics.maintenancePredictions.find(p => p.droneId === drone.id)) {
            this.missionData.predictiveAnalytics.maintenancePredictions.push({
                droneId: drone.id,
                predictedMaintenanceDate: predictedDate.toISOString().split('T')[0],
                confidence: Math.min(95, 60 + (100 - health) * 0.5),
                riskFactors: this.generateRiskFactors(drone, health, flightHours),
                recommendedActions: this.generateRecommendedActions(drone, health),
                urgency: health < 50 ? 'high' : health < 70 ? 'medium' : 'low'
            });
        }
    }

    generateRiskFactors(drone, health, flightHours) {
        const factors = [];
        
        if (health < 70) factors.push('System degradation');
        if (flightHours > 150) factors.push('High usage wear');
        if (drone.systemMetrics.batteryHealth < 80) factors.push('Battery degradation');
        if (drone.systemMetrics.motorHealth < 85) factors.push('Motor wear');
        if (drone.systemMetrics.communicationHealth < 70) factors.push('Communication instability');
        
        return factors;
    }

    generateRecommendedActions(drone, health) {
        const actions = [];
        
        if (health < 70) actions.push('Comprehensive system inspection');
        if (drone.systemMetrics.batteryHealth < 80) actions.push('Battery replacement');
        if (drone.systemMetrics.motorHealth < 85) actions.push('Motor inspection and balancing');
        if (drone.systemMetrics.communicationHealth < 70) actions.push('Communication system diagnostics');
        if (drone.systemMetrics.navigationHealth < 85) actions.push('GPS calibration');
        
        return actions;
    }

    initializeHealthDashboard() {
        // Create health monitoring dashboard if it doesn't exist
        this.createHealthDashboard();
    }

    createHealthDashboard() {
        // This will be called when the dashboard is loaded
        // The HTML structure is already in place, we just need to populate it
    }

    updateHealthDashboard() {
        // Update the health dashboard with real-time data
        this.updateFleetHealthOverview();
        this.updateHealthAlerts();
        this.updateHealthTrends();
    }

    updateFleetHealthOverview() {
        const healthScore = document.querySelector('.health-score');
        if (healthScore) {
            healthScore.textContent = `${Math.round(this.fleetHealthData.overallHealth)}%`;
        }

        const healthFill = document.querySelector('.health-fill');
        if (healthFill) {
            healthFill.style.width = `${this.fleetHealthData.overallHealth}%`;
        }
    }

    updateHealthAlerts() {
        // Update critical alerts display
        const alertsContainer = document.querySelector('.health-alerts-container');
        if (alertsContainer) {
            alertsContainer.innerHTML = '';
            
            this.fleetHealthData.criticalAlerts.slice(0, 5).forEach(alert => {
                const alertElement = document.createElement('div');
                alertElement.className = 'health-alert critical';
                alertElement.innerHTML = `
                    <div class="alert-header">
                        <span class="alert-drone">${alert.droneName}</span>
                        <span class="alert-time">${new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div class="alert-message">${alert.message}</div>
                `;
                alertsContainer.appendChild(alertElement);
            });
        }
    }

    updateHealthTrends() {
        // Update health trends chart
        const trendsContainer = document.querySelector('.health-trends-container');
        if (trendsContainer && this.fleetHealthData.healthTrends.length > 0) {
            // Create a simple trend visualization
            const trendData = this.fleetHealthData.healthTrends;
            const trendElement = document.createElement('div');
            trendElement.className = 'health-trend-chart';
            
            // Simple ASCII-style trend visualization
            const maxHealth = Math.max(...trendData.map(d => d.health));
            const minHealth = Math.min(...trendData.map(d => d.health));
            const range = maxHealth - minHealth || 1;
            
            let trendLine = '';
            trendData.forEach((point, index) => {
                const normalized = (point.health - minHealth) / range;
                const height = Math.round(normalized * 10);
                trendLine += '█'.repeat(height) + '\n';
            });
            
            trendElement.textContent = trendLine;
            trendsContainer.innerHTML = '';
            trendsContainer.appendChild(trendElement);
        }
    }

    setupHealthAlerts() {
        // Setup automatic health alert notifications
        this.healthAlertThresholds = {
            critical: 30,
            warning: 60,
            info: 80
        };
    }

    getFleetHealthSummary() {
        return {
            overallHealth: this.fleetHealthData.overallHealth,
            operationalDrones: this.fleetHealthData.operationalCount,
            criticalAlerts: this.fleetHealthData.criticalAlerts.length,
            warnings: this.fleetHealthData.warnings.length,
            trend: this.fleetHealthData.trend,
            lastUpdate: this.fleetHealthData.lastUpdate
        };
    }

    // ===== ADVANCED SEARCH & FILTERING SYSTEM =====
    setupSearchSuggestions(searchInput) {
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--command-blue);
            border: 1px solid var(--tactical-green);
            border-radius: var(--radius-base);
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(suggestionsContainer);

        searchInput.addEventListener('focus', () => {
            this.updateSearchSuggestions(searchInput.value, suggestionsContainer);
        });

        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                suggestionsContainer.style.display = 'none';
            }, 200);
        });
    }

    updateSearchSuggestions(query, container) {
        if (!query || query.length < 2) {
            container.style.display = 'none';
            return;
        }

        const suggestions = this.generateSearchSuggestions(query);
        
        if (suggestions.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = '';
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.style.cssText = `
                padding: var(--space-8) var(--space-12);
                cursor: pointer;
                border-bottom: 1px solid rgba(75, 85, 99, 0.2);
                transition: background-color 0.2s ease;
            `;
            item.innerHTML = `
                <div style="font-weight: 500; color: var(--arctic-white);">${suggestion.text}</div>
                <div style="font-size: 12px; color: rgba(248, 250, 252, 0.6);">${suggestion.category}</div>
            `;
            
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = 'rgba(45, 90, 39, 0.2)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
            });
            
            item.addEventListener('click', () => {
                this.applySearchSuggestion(suggestion);
                container.style.display = 'none';
            });
            
            container.appendChild(item);
        });
        
        container.style.display = 'block';
    }

    generateSearchSuggestions(query) {
        const suggestions = [];
        const drones = this.missionData.droneFleet;
        
        // Drone ID suggestions
        drones.forEach(drone => {
            if (drone.id.toLowerCase().includes(query)) {
                suggestions.push({
                    text: drone.id,
                    category: 'Drone ID',
                    type: 'drone_id',
                    value: drone.id
                });
            }
            
            if (drone.name.toLowerCase().includes(query)) {
                suggestions.push({
                    text: drone.name,
                    category: 'Drone Name',
                    type: 'drone_name',
                    value: drone.name
                });
            }
        });

        // Status suggestions
        const statuses = ['operational', 'maintenance', 'offline'];
        statuses.forEach(status => {
            if (status.includes(query)) {
                suggestions.push({
                    text: status.charAt(0).toUpperCase() + status.slice(1),
                    category: 'Status',
                    type: 'status',
                    value: status
                });
            }
        });

        // Location suggestions
        drones.forEach(drone => {
            if (drone.location && drone.location.lat) {
                const location = `${drone.location.lat.toFixed(2)}, ${drone.location.lng.toFixed(2)}`;
                if (location.includes(query)) {
                    suggestions.push({
                        text: location,
                        category: 'Location',
                        type: 'location',
                        value: location
                    });
                }
            }
        });

        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }

    applySearchSuggestion(suggestion) {
        const searchInput = document.getElementById('fleet-search');
        if (searchInput) {
            searchInput.value = suggestion.text;
            this.searchQuery = suggestion.text.toLowerCase();
            this.applyAdvancedFilters();
        }
    }

    initializeAdvancedFiltering() {
        // Create advanced filtering panel
        this.createAdvancedFilterPanel();
        
        // Setup filter presets
        this.setupFilterPresets();
    }

    createAdvancedFilterPanel() {
        const fleetControls = document.querySelector('.fleet-controls');
        if (!fleetControls) return;

        const advancedPanel = document.createElement('div');
        advancedPanel.className = 'advanced-filter-panel';
        advancedPanel.style.cssText = `
            margin-top: var(--space-16);
            padding: var(--space-16);
            background: rgba(27, 54, 93, 0.1);
            border: 1px solid rgba(27, 54, 93, 0.3);
            border-radius: var(--radius-base);
            display: none;
        `;

        advancedPanel.innerHTML = `
            <div class="advanced-filter-header">
                <h4 style="color: var(--tactical-green); margin-bottom: var(--space-16);">Advanced Filters</h4>
                <button class="btn btn--outline btn--sm" id="toggle-advanced-filters">Hide Advanced</button>
            </div>
            
            <div class="advanced-filter-content">
                <div class="filter-row">
                    <div class="filter-group">
                        <label class="filter-label">Flight Hours Range</label>
                        <div class="range-inputs">
                            <input type="number" id="flight-hours-min" placeholder="Min" min="0" max="1000" class="form-control">
                            <span style="color: var(--arctic-white); margin: 0 var(--space-8);">to</span>
                            <input type="number" id="flight-hours-max" placeholder="Max" min="0" max="1000" class="form-control">
                        </div>
                    </div>
                    
                    <div class="filter-group">
                        <label class="filter-label">Last Maintenance</label>
                        <select id="maintenance-filter" class="form-control">
                            <option value="all">All</option>
                            <option value="recent">Last 7 days</option>
                            <option value="overdue">Overdue</option>
                            <option value="scheduled">Scheduled</option>
                        </select>
                    </div>
                </div>
                
                <div class="filter-row">
                    <div class="filter-group">
                        <label class="filter-label">System Health Thresholds</label>
                        <div class="health-thresholds">
                            <div class="threshold-item">
                                <label>Motor Health:</label>
                                <input type="range" id="motor-health-threshold" min="0" max="100" value="70" class="slider">
                                <span id="motor-health-value">70%</span>
                            </div>
                            <div class="threshold-item">
                                <label>Battery Health:</label>
                                <input type="range" id="battery-health-threshold" min="0" max="100" value="70" class="slider">
                                <span id="battery-health-value">70%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="filter-actions">
                    <button class="btn btn--secondary" id="clear-advanced-filters">Clear All</button>
                    <button class="btn btn--primary" id="apply-advanced-filters">Apply Filters</button>
                </div>
            </div>
        `;

        fleetControls.appendChild(advancedPanel);
        this.setupAdvancedFilterEvents(advancedPanel);
    }

    setupAdvancedFilterEvents(panel) {
        // Toggle advanced filters
        const toggleBtn = panel.querySelector('#toggle-advanced-filters');
        const advancedBtn = document.querySelector('#toggle-advanced-filters') || this.createAdvancedToggleButton();
        
        if (advancedBtn) {
            advancedBtn.addEventListener('click', () => {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
                toggleBtn.textContent = panel.style.display === 'none' ? 'Show Advanced' : 'Hide Advanced';
            });
        }

        // Flight hours range
        const minInput = panel.querySelector('#flight-hours-min');
        const maxInput = panel.querySelector('#flight-hours-max');
        
        if (minInput && maxInput) {
            minInput.addEventListener('input', () => {
                this.advancedFilters.flightHours.min = parseInt(minInput.value) || 0;
            });
            
            maxInput.addEventListener('input', () => {
                this.advancedFilters.flightHours.max = parseInt(maxInput.value) || 1000;
            });
        }

        // Health thresholds
        const motorSlider = panel.querySelector('#motor-health-threshold');
        const batterySlider = panel.querySelector('#battery-health-threshold');
        
        if (motorSlider) {
            motorSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                panel.querySelector('#motor-health-value').textContent = `${value}%`;
                this.advancedFilters.systemHealth.motor = parseInt(value);
            });
        }
        
        if (batterySlider) {
            batterySlider.addEventListener('input', (e) => {
                const value = e.target.value;
                panel.querySelector('#battery-health-value').textContent = `${value}%`;
                this.advancedFilters.systemHealth.battery = parseInt(value);
            });
        }

        // Clear and apply buttons
        const clearBtn = panel.querySelector('#clear-advanced-filters');
        const applyBtn = panel.querySelector('#apply-advanced-filters');
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearAdvancedFilters(panel);
            });
        }
        
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyAdvancedFilters();
            });
        }
    }

    createAdvancedToggleButton() {
        const fleetControls = document.querySelector('.fleet-controls');
        if (!fleetControls) return null;

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'toggle-advanced-filters';
        toggleBtn.className = 'btn btn--outline btn--sm';
        toggleBtn.textContent = 'Show Advanced Filters';
        toggleBtn.style.marginTop = 'var(--space-16)';
        
        fleetControls.appendChild(toggleBtn);
        return toggleBtn;
    }

    setupFilterPresets() {
        const fleetControls = document.querySelector('.fleet-controls');
        if (!fleetControls) return;

        const presetsContainer = document.createElement('div');
        presetsContainer.className = 'filter-presets';
        presetsContainer.style.cssText = `
            margin-top: var(--space-16);
            display: flex;
            gap: var(--space-8);
            flex-wrap: wrap;
        `;

        const presets = [
            { name: 'Critical Issues', filters: { health: 'health-critical', status: 'all' } },
            { name: 'Maintenance Due', filters: { maintenance: 'overdue', status: 'all' } },
            { name: 'Ready for Mission', filters: { status: 'operational', battery: 'battery-excellent', health: 'health-excellent' } },
            { name: 'High Usage', filters: { flightHours: { min: 150, max: 1000 } } }
        ];

        presets.forEach(preset => {
            const presetBtn = document.createElement('button');
            presetBtn.className = 'btn btn--secondary btn--sm';
            presetBtn.textContent = preset.name;
            presetBtn.style.cssText = `
                padding: var(--space-6) var(--space-12);
                font-size: var(--font-size-xs);
            `;
            
            presetBtn.addEventListener('click', () => {
                this.applyFilterPreset(preset.filters);
            });
            
            presetsContainer.appendChild(presetBtn);
        });

        fleetControls.appendChild(presetsContainer);
    }

    applyFilterPreset(presetFilters) {
        // Apply preset filters
        Object.assign(this.currentFilters, presetFilters);
        Object.assign(this.advancedFilters, presetFilters);
        
        // Update UI
        this.updateFilterUI();
        this.applyAdvancedFilters();
        
        this.showNotification(`Applied filter preset`, 'info');
    }

    applyAdvancedFilters() {
        const fleetItems = document.querySelectorAll('.fleet-item');
        const filteredDrones = [];
        
        fleetItems.forEach(item => {
            const droneId = item.querySelector('.fleet-id')?.textContent;
            const drone = this.missionData.droneFleet.find(d => d.id === droneId);
            
            if (drone && this.matchesAdvancedFilters(drone)) {
                filteredDrones.push({ element: item, drone: drone });
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Sort the visible items
        this.sortFleetItems(filteredDrones);
        
        // Update results counter
        this.updateFilterResults(filteredDrones.length, fleetItems.length);
    }

    matchesAdvancedFilters(drone) {
        // Basic filters
        if (!this.matchesFilters(drone)) {
            return false;
        }

        // Advanced filters
        if (this.advancedFilters.flightHours) {
            const flightHours = drone.flightHours || 0;
            if (flightHours < this.advancedFilters.flightHours.min || 
                flightHours > this.advancedFilters.flightHours.max) {
                return false;
            }
        }

        // System health thresholds
        if (this.advancedFilters.systemHealth) {
            if (this.advancedFilters.systemHealth.motor && 
                drone.systemMetrics?.motorHealth < this.advancedFilters.systemHealth.motor) {
                return false;
            }
            
            if (this.advancedFilters.systemHealth.battery && 
                drone.systemMetrics?.batteryHealth < this.advancedFilters.systemHealth.battery) {
                return false;
            }
        }

        // Maintenance filters
        if (this.advancedFilters.maintenance) {
            const lastMaintenance = new Date(drone.lastMaintenance);
            const now = new Date();
            const daysSinceMaintenance = (now - lastMaintenance) / (1000 * 60 * 60 * 24);
            
            switch (this.advancedFilters.maintenance) {
                case 'recent':
                    if (daysSinceMaintenance > 7) return false;
                    break;
                case 'overdue':
                    if (daysSinceMaintenance <= 30) return false;
                    break;
                case 'scheduled':
                    if (!drone.maintenanceSchedule?.nextScheduled) return false;
                    break;
            }
        }

        return true;
    }

    updateFilterResults(visible, total) {
        let resultsCounter = document.querySelector('.filter-results');
        if (!resultsCounter) {
            resultsCounter = document.createElement('div');
            resultsCounter.className = 'filter-results';
            resultsCounter.style.cssText = `
                margin-top: var(--space-16);
                padding: var(--space-8) var(--space-12);
                background: rgba(45, 90, 39, 0.1);
                border: 1px solid rgba(45, 90, 39, 0.3);
                border-radius: var(--radius-base);
                color: var(--tactical-green);
                font-size: var(--font-size-sm);
                text-align: center;
            `;
            
            const fleetControls = document.querySelector('.fleet-controls');
            if (fleetControls) {
                fleetControls.appendChild(resultsCounter);
            }
        }
        
        resultsCounter.textContent = `Showing ${visible} of ${total} drones`;
    }

    clearAdvancedFilters(panel) {
        // Reset all filters
        this.currentFilters = {
            status: 'all',
            battery: 'all',
            health: 'all',
            mission: 'all',
            location: 'all',
            maintenance: 'all'
        };
        
        this.advancedFilters = {
            dateRange: null,
            flightHours: { min: 0, max: 1000 },
            lastMaintenance: null,
            systemHealth: {}
        };
        
        this.searchQuery = '';
        
        // Reset UI
        if (panel) {
            panel.querySelector('#flight-hours-min').value = '';
            panel.querySelector('#flight-hours-max').value = '';
            panel.querySelector('#motor-health-threshold').value = 70;
            panel.querySelector('#battery-health-threshold').value = 70;
            panel.querySelector('#motor-health-value').textContent = '70%';
            panel.querySelector('#battery-health-value').textContent = '70%';
        }
        
        // Reset search input
        const searchInput = document.getElementById('fleet-search');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.filter === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        this.applyAdvancedFilters();
        this.showNotification('All filters cleared', 'info');
    }

    toggleFleetItemExpansion(item) {
        const isExpanded = item.classList.contains('expanded');
        
        if (isExpanded) {
            item.classList.remove('expanded');
            const details = item.querySelector('.fleet-item-details');
            if (details) {
                details.style.maxHeight = '0';
                details.style.opacity = '0';
            }
        } else {
            item.classList.add('expanded');
            const details = item.querySelector('.fleet-item-details');
            if (details) {
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.opacity = '1';
            }
        }
    }

    setupQuickActions() {
        const fleetList = document.querySelector('.fleet-list');
        if (!fleetList) return;

        // Add quick action buttons to each fleet item
        const fleetItems = document.querySelectorAll('.fleet-item');
        fleetItems.forEach(item => {
            this.addQuickActionsToItem(item);
        });
    }

    addQuickActionsToItem(item) {
        const header = item.querySelector('.fleet-item-header');
        if (!header) return;

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'quick-actions';
        actionsContainer.style.cssText = `
            display: flex;
            gap: var(--space-4);
            margin-left: auto;
        `;

        const actions = [
            { icon: '📊', action: 'details', tooltip: 'View Details' },
            { icon: '🎮', action: 'control', tooltip: 'Control' },
            { icon: '🔧', action: 'maintenance', tooltip: 'Schedule Maintenance' },
            { icon: '📡', action: 'status', tooltip: 'Check Status' }
        ];

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.innerHTML = action.icon;
            btn.title = action.tooltip;
            btn.style.cssText = `
                width: 32px;
                height: 32px;
                border: none;
                background: rgba(75, 85, 99, 0.2);
                border-radius: var(--radius-sm);
                color: var(--arctic-white);
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            `;
            
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'var(--tactical-green)';
                btn.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(75, 85, 99, 0.2)';
                btn.style.transform = 'scale(1)';
            });
            
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleQuickAction(action.action, item);
            });
            
            actionsContainer.appendChild(btn);
        });

        header.appendChild(actionsContainer);
    }

    handleQuickAction(action, item) {
        const droneId = item.querySelector('.fleet-id')?.textContent;
        const drone = this.missionData.droneFleet.find(d => d.id === droneId);
        
        if (!drone) return;

        switch (action) {
            case 'details':
                this.showEnhancedDroneDetails(droneId);
                break;
            case 'control':
                this.showDroneControlInterface(droneId);
                break;
            case 'maintenance':
                this.scheduleMaintenance(droneId);
                break;
            case 'status':
                this.checkDroneStatus(droneId);
                break;
        }
        
        this.hapticFeedback();
    }

    checkDroneStatus(droneId) {
        const drone = this.missionData.droneFleet.find(d => d.id === droneId);
        if (drone) {
            const status = {
                id: drone.id,
                name: drone.name,
                status: drone.status,
                health: drone.systemMetrics?.overallHealth || 0,
                battery: drone.battery,
                lastUpdate: drone.telemetry?.lastUpdate || 'Unknown'
            };
            
            this.showNotification(`Status check for ${drone.name}: ${drone.status.toUpperCase()}`, 'info');
        }
    }

    // ===== PREDICTIVE MAINTENANCE SYSTEM =====
    initializePredictiveMaintenance() {
        this.predictiveMaintenance = {
            models: {
                battery: new BatteryMaintenanceModel(),
                motor: new MotorMaintenanceModel(),
                communication: new CommunicationMaintenanceModel(),
                navigation: new NavigationMaintenanceModel()
            },
            predictions: [],
            maintenanceSchedule: [],
            alerts: [],
            lastAnalysis: new Date()
        };

        // Start predictive analysis
        this.startPredictiveAnalysis();
        
        // Initialize maintenance dashboard
        this.initializeMaintenanceDashboard();
        
        // Setup maintenance alerts
        this.setupMaintenanceAlerts();
    }

    startPredictiveAnalysis() {
        // Run predictive analysis every 5 minutes
        setInterval(() => {
            this.runPredictiveAnalysis();
        }, 300000);

        // Run initial analysis
        this.runPredictiveAnalysis();
    }

    runPredictiveAnalysis() {
        const drones = this.missionData.droneFleet;
        
        drones.forEach(drone => {
            if (drone.systemMetrics) {
                // Analyze each system component
                this.analyzeBatteryMaintenance(drone);
                this.analyzeMotorMaintenance(drone);
                this.analyzeCommunicationMaintenance(drone);
                this.analyzeNavigationMaintenance(drone);
                
                // Generate overall maintenance prediction
                this.generateMaintenancePrediction(drone);
            }
        });

        // Update maintenance schedule
        this.updateMaintenanceSchedule();
        
        // Check for urgent maintenance needs
        this.checkUrgentMaintenance();
        
        this.predictiveMaintenance.lastAnalysis = new Date();
    }

    analyzeBatteryMaintenance(drone) {
        const batteryHealth = drone.systemMetrics.batteryHealth;
        const batteryLevel = drone.battery;
        const flightHours = drone.flightHours || 0;
        
        // Battery degradation model
        const degradationRate = this.calculateBatteryDegradation(drone);
        const predictedFailureDate = this.predictBatteryFailure(drone, degradationRate);
        
        if (predictedFailureDate) {
            this.addMaintenancePrediction(drone, 'battery', {
                predictedDate: predictedFailureDate,
                confidence: this.calculateBatteryConfidence(drone),
                riskFactors: this.getBatteryRiskFactors(drone),
                recommendedActions: this.getBatteryMaintenanceActions(drone),
                urgency: this.calculateBatteryUrgency(drone, predictedFailureDate)
            });
        }
    }

    analyzeMotorMaintenance(drone) {
        const motorHealth = drone.systemMetrics.motorHealth;
        const vibration = drone.telemetry?.vibration || 0;
        const flightHours = drone.flightHours || 0;
        
        // Motor wear analysis
        const wearRate = this.calculateMotorWear(drone);
        const predictedMaintenanceDate = this.predictMotorMaintenance(drone, wearRate);
        
        if (predictedMaintenanceDate) {
            this.addMaintenancePrediction(drone, 'motor', {
                predictedDate: predictedMaintenanceDate,
                confidence: this.calculateMotorConfidence(drone),
                riskFactors: this.getMotorRiskFactors(drone),
                recommendedActions: this.getMotorMaintenanceActions(drone),
                urgency: this.calculateMotorUrgency(drone, predictedMaintenanceDate)
            });
        }
    }

    analyzeCommunicationMaintenance(drone) {
        const commHealth = drone.systemMetrics.communicationHealth;
        const signalStrength = drone.telemetry?.signalStrength || 0;
        
        // Communication system analysis
        const signalDegradation = this.calculateSignalDegradation(drone);
        const predictedMaintenanceDate = this.predictCommunicationMaintenance(drone, signalDegradation);
        
        if (predictedMaintenanceDate) {
            this.addMaintenancePrediction(drone, 'communication', {
                predictedDate: predictedMaintenanceDate,
                confidence: this.calculateCommunicationConfidence(drone),
                riskFactors: this.getCommunicationRiskFactors(drone),
                recommendedActions: this.getCommunicationMaintenanceActions(drone),
                urgency: this.calculateCommunicationUrgency(drone, predictedMaintenanceDate)
            });
        }
    }

    analyzeNavigationMaintenance(drone) {
        const navHealth = drone.systemMetrics.navigationHealth;
        const gpsAccuracy = drone.telemetry?.gpsAccuracy || 0;
        
        // Navigation system analysis
        const accuracyDegradation = this.calculateNavigationDegradation(drone);
        const predictedMaintenanceDate = this.predictNavigationMaintenance(drone, accuracyDegradation);
        
        if (predictedMaintenanceDate) {
            this.addMaintenancePrediction(drone, 'navigation', {
                predictedDate: predictedMaintenanceDate,
                confidence: this.calculateNavigationConfidence(drone),
                riskFactors: this.getNavigationRiskFactors(drone),
                recommendedActions: this.getNavigationMaintenanceActions(drone),
                urgency: this.calculateNavigationUrgency(drone, predictedMaintenanceDate)
            });
        }
    }

    generateMaintenancePrediction(drone) {
        const predictions = this.predictiveMaintenance.predictions.filter(p => p.droneId === drone.id);
        
        if (predictions.length === 0) return;

        // Find the earliest predicted maintenance date
        const earliestDate = predictions.reduce((earliest, prediction) => {
            return new Date(prediction.predictedDate) < new Date(earliest.predictedDate) ? prediction : earliest;
        }, predictions[0]);

        // Calculate overall confidence
        const overallConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;

        // Generate risk factors
        const allRiskFactors = predictions.flatMap(p => p.riskFactors);
        const uniqueRiskFactors = [...new Set(allRiskFactors)];

        // Generate recommended actions
        const allActions = predictions.flatMap(p => p.recommendedActions);
        const uniqueActions = [...new Set(allActions)];

        // Calculate overall urgency
        const overallUrgency = this.calculateOverallUrgency(predictions);

        // Update or create overall prediction
        const existingPrediction = this.missionData.predictiveAnalytics.maintenancePredictions.find(p => p.droneId === drone.id);
        
        if (existingPrediction) {
            existingPrediction.predictedMaintenanceDate = earliestDate.predictedDate.toISOString().split('T')[0];
            existingPrediction.confidence = Math.round(overallConfidence);
            existingPrediction.riskFactors = uniqueRiskFactors;
            existingPrediction.recommendedActions = uniqueActions;
            existingPrediction.urgency = overallUrgency;
        } else {
            this.missionData.predictiveAnalytics.maintenancePredictions.push({
                droneId: drone.id,
                predictedMaintenanceDate: earliestDate.predictedDate.toISOString().split('T')[0],
                confidence: Math.round(overallConfidence),
                riskFactors: uniqueRiskFactors,
                recommendedActions: uniqueActions,
                urgency: overallUrgency
            });
        }
    }

    // Battery Maintenance Model
    calculateBatteryDegradation(drone) {
        const batteryHealth = drone.systemMetrics.batteryHealth;
        const flightHours = drone.flightHours || 0;
        const batteryLevel = drone.battery;
        
        // Simple degradation model based on health, usage, and current level
        const baseDegradation = (100 - batteryHealth) / 100;
        const usageFactor = Math.min(flightHours / 200, 1); // Normalize to 200 hours
        const levelFactor = (100 - batteryLevel) / 100;
        
        return baseDegradation * 0.5 + usageFactor * 0.3 + levelFactor * 0.2;
    }

    predictBatteryFailure(drone, degradationRate) {
        if (degradationRate < 0.3) return null; // No immediate concern
        
        const daysToFailure = Math.max(1, Math.round((1 - degradationRate) * 30));
        const predictedDate = new Date();
        predictedDate.setDate(predictedDate.getDate() + daysToFailure);
        
        return predictedDate;
    }

    calculateBatteryConfidence(drone) {
        const batteryHealth = drone.systemMetrics.batteryHealth;
        const flightHours = drone.flightHours || 0;
        
        // Confidence based on data quality and system health
        let confidence = 70; // Base confidence
        
        if (batteryHealth < 50) confidence += 20;
        if (flightHours > 100) confidence += 10;
        
        return Math.min(95, confidence);
    }

    getBatteryRiskFactors(drone) {
        const factors = [];
        const batteryHealth = drone.systemMetrics.batteryHealth;
        const flightHours = drone.flightHours || 0;
        const batteryLevel = drone.battery;
        
        if (batteryHealth < 70) factors.push('Battery health degradation');
        if (flightHours > 150) factors.push('High usage wear');
        if (batteryLevel < 20) factors.push('Low battery level');
        if (batteryHealth < 50) factors.push('Critical battery condition');
        
        return factors;
    }

    getBatteryMaintenanceActions(drone) {
        const actions = [];
        const batteryHealth = drone.systemMetrics.batteryHealth;
        
        if (batteryHealth < 50) {
            actions.push('Immediate battery replacement');
        } else if (batteryHealth < 70) {
            actions.push('Schedule battery replacement');
        } else {
            actions.push('Battery health monitoring');
        }
        
        actions.push('Battery performance testing');
        actions.push('Charging system inspection');
        
        return actions;
    }

    calculateBatteryUrgency(drone, predictedDate) {
        const daysUntilMaintenance = Math.ceil((predictedDate - new Date()) / (1000 * 60 * 60 * 24));
        const batteryHealth = drone.systemMetrics.batteryHealth;
        
        if (batteryHealth < 30 || daysUntilMaintenance <= 3) return 'high';
        if (batteryHealth < 50 || daysUntilMaintenance <= 7) return 'medium';
        return 'low';
    }

    // Motor Maintenance Model
    calculateMotorWear(drone) {
        const motorHealth = drone.systemMetrics.motorHealth;
        const vibration = drone.telemetry?.vibration || 0;
        const flightHours = drone.flightHours || 0;
        
        const healthFactor = (100 - motorHealth) / 100;
        const vibrationFactor = Math.min(vibration / 1.0, 1); // Normalize to 1g
        const usageFactor = Math.min(flightHours / 300, 1); // Normalize to 300 hours
        
        return healthFactor * 0.4 + vibrationFactor * 0.4 + usageFactor * 0.2;
    }

    predictMotorMaintenance(drone, wearRate) {
        if (wearRate < 0.4) return null; // No immediate concern
        
        const daysToMaintenance = Math.max(1, Math.round((1 - wearRate) * 45));
        const predictedDate = new Date();
        predictedDate.setDate(predictedDate.getDate() + daysToMaintenance);
        
        return predictedDate;
    }

    calculateMotorConfidence(drone) {
        const motorHealth = drone.systemMetrics.motorHealth;
        const vibration = drone.telemetry?.vibration || 0;
        
        let confidence = 65; // Base confidence
        
        if (motorHealth < 60) confidence += 25;
        if (vibration > 0.5) confidence += 10;
        
        return Math.min(95, confidence);
    }

    getMotorRiskFactors(drone) {
        const factors = [];
        const motorHealth = drone.systemMetrics.motorHealth;
        const vibration = drone.telemetry?.vibration || 0;
        const flightHours = drone.flightHours || 0;
        
        if (motorHealth < 70) factors.push('Motor health degradation');
        if (vibration > 0.5) factors.push('Increased vibration levels');
        if (flightHours > 200) factors.push('High usage wear');
        if (motorHealth < 50) factors.push('Critical motor condition');
        
        return factors;
    }

    getMotorMaintenanceActions(drone) {
        const actions = [];
        const motorHealth = drone.systemMetrics.motorHealth;
        const vibration = drone.telemetry?.vibration || 0;
        
        if (motorHealth < 50) {
            actions.push('Motor replacement required');
        } else if (motorHealth < 70) {
            actions.push('Motor inspection and repair');
        } else {
            actions.push('Motor performance check');
        }
        
        if (vibration > 0.5) {
            actions.push('Motor balancing');
        }
        
        actions.push('Lubrication check');
        actions.push('Bearing inspection');
        
        return actions;
    }

    calculateMotorUrgency(drone, predictedDate) {
        const daysUntilMaintenance = Math.ceil((predictedDate - new Date()) / (1000 * 60 * 60 * 24));
        const motorHealth = drone.systemMetrics.motorHealth;
        const vibration = drone.telemetry?.vibration || 0;
        
        if (motorHealth < 40 || vibration > 0.8 || daysUntilMaintenance <= 5) return 'high';
        if (motorHealth < 60 || vibration > 0.5 || daysUntilMaintenance <= 14) return 'medium';
        return 'low';
    }

    // Communication Maintenance Model
    calculateSignalDegradation(drone) {
        const commHealth = drone.systemMetrics.communicationHealth;
        const signalStrength = drone.telemetry?.signalStrength || 0;
        
        const healthFactor = (100 - commHealth) / 100;
        const signalFactor = (100 - signalStrength) / 100;
        
        return healthFactor * 0.6 + signalFactor * 0.4;
    }

    predictCommunicationMaintenance(drone, degradation) {
        if (degradation < 0.3) return null;
        
        const daysToMaintenance = Math.max(1, Math.round((1 - degradation) * 60));
        const predictedDate = new Date();
        predictedDate.setDate(predictedDate.getDate() + daysToMaintenance);
        
        return predictedDate;
    }

    calculateCommunicationConfidence(drone) {
        const commHealth = drone.systemMetrics.communicationHealth;
        const signalStrength = drone.telemetry?.signalStrength || 0;
        
        let confidence = 60; // Base confidence
        
        if (commHealth < 60) confidence += 25;
        if (signalStrength < 50) confidence += 15;
        
        return Math.min(90, confidence);
    }

    getCommunicationRiskFactors(drone) {
        const factors = [];
        const commHealth = drone.systemMetrics.communicationHealth;
        const signalStrength = drone.telemetry?.signalStrength || 0;
        
        if (commHealth < 70) factors.push('Communication system degradation');
        if (signalStrength < 50) factors.push('Poor signal strength');
        if (commHealth < 50) factors.push('Critical communication issues');
        
        return factors;
    }

    getCommunicationMaintenanceActions(drone) {
        const actions = [];
        const commHealth = drone.systemMetrics.communicationHealth;
        
        if (commHealth < 50) {
            actions.push('Communication system overhaul');
        } else if (commHealth < 70) {
            actions.push('Communication system diagnostics');
        } else {
            actions.push('Communication system check');
        }
        
        actions.push('Antenna inspection');
        actions.push('Signal quality testing');
        actions.push('Firmware update check');
        
        return actions;
    }

    calculateCommunicationUrgency(drone, predictedDate) {
        const daysUntilMaintenance = Math.ceil((predictedDate - new Date()) / (1000 * 60 * 60 * 24));
        const commHealth = drone.systemMetrics.communicationHealth;
        const signalStrength = drone.telemetry?.signalStrength || 0;
        
        if (commHealth < 40 || signalStrength < 30 || daysUntilMaintenance <= 7) return 'high';
        if (commHealth < 60 || signalStrength < 50 || daysUntilMaintenance <= 21) return 'medium';
        return 'low';
    }

    // Navigation Maintenance Model
    calculateNavigationDegradation(drone) {
        const navHealth = drone.systemMetrics.navigationHealth;
        const gpsAccuracy = drone.telemetry?.gpsAccuracy || 0;
        
        const healthFactor = (100 - navHealth) / 100;
        const accuracyFactor = Math.min(gpsAccuracy / 10, 1); // Normalize to 10m accuracy
        
        return healthFactor * 0.7 + accuracyFactor * 0.3;
    }

    predictNavigationMaintenance(drone, degradation) {
        if (degradation < 0.2) return null;
        
        const daysToMaintenance = Math.max(1, Math.round((1 - degradation) * 90));
        const predictedDate = new Date();
        predictedDate.setDate(predictedDate.getDate() + daysToMaintenance);
        
        return predictedDate;
    }

    calculateNavigationConfidence(drone) {
        const navHealth = drone.systemMetrics.navigationHealth;
        const gpsAccuracy = drone.telemetry?.gpsAccuracy || 0;
        
        let confidence = 70; // Base confidence
        
        if (navHealth < 70) confidence += 20;
        if (gpsAccuracy > 5) confidence += 10;
        
        return Math.min(95, confidence);
    }

    getNavigationRiskFactors(drone) {
        const factors = [];
        const navHealth = drone.systemMetrics.navigationHealth;
        const gpsAccuracy = drone.telemetry?.gpsAccuracy || 0;
        
        if (navHealth < 80) factors.push('Navigation system degradation');
        if (gpsAccuracy > 5) factors.push('GPS accuracy issues');
        if (navHealth < 60) factors.push('Critical navigation problems');
        
        return factors;
    }

    getNavigationMaintenanceActions(drone) {
        const actions = [];
        const navHealth = drone.systemMetrics.navigationHealth;
        const gpsAccuracy = drone.telemetry?.gpsAccuracy || 0;
        
        if (navHealth < 60) {
            actions.push('Navigation system repair');
        } else if (navHealth < 80) {
            actions.push('Navigation system calibration');
        } else {
            actions.push('Navigation system check');
        }
        
        if (gpsAccuracy > 5) {
            actions.push('GPS calibration');
        }
        
        actions.push('IMU calibration');
        actions.push('Compass calibration');
        actions.push('Software update check');
        
        return actions;
    }

    calculateNavigationUrgency(drone, predictedDate) {
        const daysUntilMaintenance = Math.ceil((predictedDate - new Date()) / (1000 * 60 * 60 * 24));
        const navHealth = drone.systemMetrics.navigationHealth;
        const gpsAccuracy = drone.telemetry?.gpsAccuracy || 0;
        
        if (navHealth < 50 || gpsAccuracy > 10 || daysUntilMaintenance <= 10) return 'high';
        if (navHealth < 70 || gpsAccuracy > 5 || daysUntilMaintenance <= 30) return 'medium';
        return 'low';
    }

    addMaintenancePrediction(drone, system, prediction) {
        const existingPrediction = this.predictiveMaintenance.predictions.find(
            p => p.droneId === drone.id && p.system === system
        );
        
        if (existingPrediction) {
            Object.assign(existingPrediction, prediction);
        } else {
            this.predictiveMaintenance.predictions.push({
                droneId: drone.id,
                system: system,
                ...prediction
            });
        }
    }

    calculateOverallUrgency(predictions) {
        const urgencies = predictions.map(p => p.urgency);
        
        if (urgencies.includes('high')) return 'high';
        if (urgencies.includes('medium')) return 'medium';
        return 'low';
    }

    updateMaintenanceSchedule() {
        // Sort predictions by urgency and date
        const sortedPredictions = this.predictiveMaintenance.predictions
            .filter(p => p.predictedDate)
            .sort((a, b) => {
                const urgencyOrder = { high: 3, medium: 2, low: 1 };
                const urgencyDiff = urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
                if (urgencyDiff !== 0) return urgencyDiff;
                return new Date(a.predictedDate) - new Date(b.predictedDate);
            });

        this.predictiveMaintenance.maintenanceSchedule = sortedPredictions;
    }

    checkUrgentMaintenance() {
        const urgentPredictions = this.predictiveMaintenance.predictions.filter(p => 
            p.urgency === 'high' && 
            new Date(p.predictedDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
        );

        urgentPredictions.forEach(prediction => {
            const drone = this.missionData.droneFleet.find(d => d.id === prediction.droneId);
            if (drone) {
                this.showNotification(
                    `URGENT: ${drone.name} ${prediction.system} maintenance required within 7 days`, 
                    'error'
                );
            }
        });
    }

    initializeMaintenanceDashboard() {
        // Create maintenance dashboard if it doesn't exist
        this.createMaintenanceDashboard();
    }

    createMaintenanceDashboard() {
        // This will be called when the dashboard is loaded
        // The HTML structure is already in place, we just need to populate it
    }

    setupMaintenanceAlerts() {
        // Setup automatic maintenance alert notifications
        this.maintenanceAlertThresholds = {
            urgent: 7, // days
            warning: 14, // days
            info: 30 // days
        };
    }

    getMaintenanceSummary() {
        const predictions = this.predictiveMaintenance.predictions;
        const schedule = this.predictiveMaintenance.maintenanceSchedule;
        
        return {
            totalPredictions: predictions.length,
            urgentMaintenance: predictions.filter(p => p.urgency === 'high').length,
            scheduledMaintenance: schedule.length,
            nextMaintenance: schedule[0] || null,
            lastAnalysis: this.predictiveMaintenance.lastAnalysis
        };
    }
}

// Maintenance Model Classes
class BatteryMaintenanceModel {
    constructor() {
        this.degradationRate = 0.1; // 10% per 100 flight hours
        this.criticalThreshold = 30; // 30% health
        this.warningThreshold = 50; // 50% health
    }
}

class MotorMaintenanceModel {
    constructor() {
        this.wearRate = 0.15; // 15% per 100 flight hours
        this.vibrationThreshold = 0.5; // 0.5g
        this.criticalThreshold = 40; // 40% health
    }
}

class CommunicationMaintenanceModel {
    constructor() {
        this.signalDegradationRate = 0.05; // 5% per 100 flight hours
        this.signalThreshold = 50; // 50% signal strength
        this.criticalThreshold = 40; // 40% health
    }
    // Fleet Security - Threat Detection and Response
    setupFleetSecurity() {
        this.setupThreatMonitoring();
        this.setupSecurityDashboard();
        this.setupThreatResponseProtocols();
        this.setupSecurityAlerts();
    }

    setupThreatMonitoring() {
        // Real-time threat monitoring
        setInterval(() => {
            this.updateThreatStatus();
            this.checkSecurityMetrics();
        }, 5000); // Check every 5 seconds

        // Setup threat detection UI
        this.setupThreatDetectionUI();
    }

    setupThreatDetectionUI() {
        // Add threat indicators to drone cards
        const droneCards = document.querySelectorAll('.drone-card');
        droneCards.forEach(card => {
            const droneId = card.dataset.drone;
            this.addThreatIndicator(card, droneId);
        });
    }

    addThreatIndicator(card, droneId) {
        const threatIndicator = document.createElement('div');
        threatIndicator.className = 'threat-indicator';
        threatIndicator.innerHTML = `
            <div class="threat-status">
                <span class="threat-icon">🛡️</span>
                <span class="threat-level">SECURE</span>
            </div>
        `;
        
        const header = card.querySelector('.drone-header');
        if (header) {
            header.appendChild(threatIndicator);
        }
    }

    updateThreatStatus() {
        const activeThreats = this.missionData.fleetSecurity.threatDetection.activeThreats;
        
        activeThreats.forEach(threat => {
            threat.affectedDrones.forEach(droneId => {
                this.updateDroneThreatStatus(droneId, threat);
            });
        });
    }

    updateDroneThreatStatus(droneId, threat) {
        const droneCard = document.querySelector(`[data-drone="${droneId}"]`);
        if (!droneCard) return;

        const threatIndicator = droneCard.querySelector('.threat-indicator');
        if (!threatIndicator) return;

        const threatLevel = threatIndicator.querySelector('.threat-level');
        const threatIcon = threatIndicator.querySelector('.threat-icon');
        
        if (threatLevel && threatIcon) {
            switch (threat.severity) {
                case 'critical':
                    threatLevel.textContent = 'CRITICAL';
                    threatLevel.className = 'threat-level critical';
                    threatIcon.textContent = '🚨';
                    break;
                case 'high':
                    threatLevel.textContent = 'HIGH';
                    threatLevel.className = 'threat-level high';
                    threatIcon.textContent = '⚠️';
                    break;
                case 'medium':
                    threatLevel.textContent = 'MEDIUM';
                    threatLevel.className = 'threat-level medium';
                    threatIcon.textContent = '⚡';
                    break;
                default:
                    threatLevel.textContent = 'SECURE';
                    threatLevel.className = 'threat-level secure';
                    threatIcon.textContent = '🛡️';
            }
        }
    }

    setupSecurityDashboard() {
        // Create security dashboard section
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;

        const securitySection = document.createElement('section');
        securitySection.className = 'dashboard-section';
        securitySection.innerHTML = `
            <h2 class="section-title">Fleet Security</h2>
            <div class="security-overview">
                <div class="security-metrics">
                    <div class="security-metric">
                        <span class="metric-value">${this.missionData.fleetSecurity.securityMetrics.threatDetectionRate}%</span>
                        <span class="metric-label">Threat Detection Rate</span>
                    </div>
                    <div class="security-metric">
                        <span class="metric-value">${this.missionData.fleetSecurity.securityMetrics.responseTime}s</span>
                        <span class="metric-label">Avg Response Time</span>
                    </div>
                    <div class="security-metric">
                        <span class="metric-value">${this.missionData.fleetSecurity.securityMetrics.securityScore}%</span>
                        <span class="metric-label">Security Score</span>
                    </div>
                </div>
                <div class="active-threats">
                    <h3>Active Threats</h3>
                    <div class="threat-list" id="active-threats-list">
                        <!-- Threats will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;

        dashboardGrid.appendChild(securitySection);
        this.populateActiveThreats();
    }

    populateActiveThreats() {
        const threatList = document.getElementById('active-threats-list');
        if (!threatList) return;

        const activeThreats = this.missionData.fleetSecurity.threatDetection.activeThreats;
        
        threatList.innerHTML = activeThreats.map(threat => `
            <div class="threat-item ${threat.severity}">
                <div class="threat-header">
                    <span class="threat-id">${threat.id}</span>
                    <span class="threat-severity ${threat.severity}">${threat.severity.toUpperCase()}</span>
                </div>
                <div class="threat-description">${threat.description}</div>
                <div class="threat-drones">Affected: ${threat.affectedDrones.join(', ')}</div>
                <div class="threat-response">Response: ${threat.responseLevel}</div>
            </div>
        `).join('');
    }

    setupThreatResponseProtocols() {
        // Setup automated threat response
        this.setupEmergencyResponse();
        this.setupRouteDiversion();
        this.setupCommunicationEncryption();
    }

    setupEmergencyResponse() {
        // Monitor for critical threats and trigger emergency protocols
        setInterval(() => {
            const criticalThreats = this.missionData.fleetSecurity.threatDetection.activeThreats
                .filter(threat => threat.severity === 'critical');
            
            if (criticalThreats.length > 0) {
                this.triggerEmergencyProtocol(criticalThreats);
            }
        }, 2000);
    }

    triggerEmergencyProtocol(threats) {
        threats.forEach(threat => {
            threat.affectedDrones.forEach(droneId => {
                this.executeEmergencyLanding(droneId, threat);
            });
        });
    }

    executeEmergencyLanding(droneId, threat) {
        this.showNotification(`EMERGENCY: ${droneId} executing emergency landing due to ${threat.type}`, 'error');
        
        // Update drone status
        const drone = this.missionData.droneFleet.find(d => d.id === droneId);
        if (drone) {
            drone.status = 'emergency_landing';
            this.updateDroneCard(drone);
        }
    }

    setupRouteDiversion() {
        // Monitor for threats requiring route diversion
        setInterval(() => {
            const diversionThreats = this.missionData.fleetSecurity.threatDetection.activeThreats
                .filter(threat => threat.type === 'Physical Threat' && threat.severity !== 'low');
            
            if (diversionThreats.length > 0) {
                this.executeRouteDiversion(diversionThreats);
            }
        }, 3000);
    }

    executeRouteDiversion(threats) {
        threats.forEach(threat => {
            threat.affectedDrones.forEach(droneId => {
                this.showNotification(`Route diversion activated for ${droneId} due to ${threat.description}`, 'warning');
            });
        });
    }

    setupSecurityAlerts() {
        // Setup security alert notifications
        this.setupSecurityNotifications();
    }

    setupSecurityNotifications() {
        // Monitor security metrics and trigger alerts
        setInterval(() => {
            const metrics = this.missionData.fleetSecurity.securityMetrics;
            
            if (metrics.threatDetectionRate < 95) {
                this.showNotification('WARNING: Threat detection rate below threshold', 'warning');
            }
            
            if (metrics.responseTime > 5) {
                this.showNotification('WARNING: Response time above acceptable limit', 'warning');
            }
        }, 10000);
    }

    checkSecurityMetrics() {
        // Update security metrics in real-time
        const metrics = this.missionData.fleetSecurity.securityMetrics;
        
        // Simulate metric updates
        metrics.threatDetectionRate = Math.max(90, Math.min(100, metrics.threatDetectionRate + (Math.random() - 0.5) * 2));
        metrics.responseTime = Math.max(1, Math.min(10, metrics.responseTime + (Math.random() - 0.5) * 0.5));
        metrics.securityScore = Math.max(80, Math.min(100, metrics.securityScore + (Math.random() - 0.5) * 1));
    }

    // Performance Optimization - Overall Fleet Optimization
    setupPerformanceOptimization() {
        this.setupRouteOptimization();
        this.setupResourceAllocation();
        this.setupEfficiencyMonitoring();
        this.setupOptimizationRecommendations();
    }

    setupRouteOptimization() {
        // Real-time route optimization
        setInterval(() => {
            this.optimizeActiveRoutes();
            this.updateOptimizationMetrics();
        }, 10000); // Check every 10 seconds

        // Setup route optimization UI
        this.setupRouteOptimizationUI();
    }

    setupRouteOptimizationUI() {
        // Add optimization indicators to mission cards
        const missionItems = document.querySelectorAll('.mission-item');
        missionItems.forEach(item => {
            this.addOptimizationIndicator(item);
        });
    }

    addOptimizationIndicator(missionItem) {
        const optimizationIndicator = document.createElement('div');
        optimizationIndicator.className = 'optimization-indicator';
        optimizationIndicator.innerHTML = `
            <div class="optimization-status">
                <span class="optimization-icon">⚡</span>
                <span class="optimization-savings">Optimized</span>
            </div>
        `;
        
        const missionInfo = missionItem.querySelector('.mission-info');
        if (missionInfo) {
            missionInfo.appendChild(optimizationIndicator);
        }
    }

    optimizeActiveRoutes() {
        const activeOptimizations = this.missionData.performanceOptimization.routeOptimization.activeOptimizations;
        
        activeOptimizations.forEach(optimization => {
            this.applyRouteOptimization(optimization);
        });
    }

    applyRouteOptimization(optimization) {
        // Simulate route optimization application
        const missionItem = document.querySelector(`[data-mission="${optimization.missionId}"]`);
        if (missionItem) {
            const optimizationIndicator = missionItem.querySelector('.optimization-indicator');
            if (optimizationIndicator) {
                const savings = optimizationIndicator.querySelector('.optimization-savings');
                if (savings) {
                    savings.textContent = `${optimization.fuelSavings}% saved`;
                }
            }
        }
    }

    updateOptimizationMetrics() {
        const metrics = this.missionData.performanceOptimization.routeOptimization.optimizationMetrics;
        
        // Simulate metric updates
        metrics.averageFuelSavings = Math.max(10, Math.min(30, metrics.averageFuelSavings + (Math.random() - 0.5) * 2));
        metrics.averageTimeSavings = Math.max(1, Math.min(10, metrics.averageTimeSavings + (Math.random() - 0.5) * 0.5));
        metrics.optimizationSuccessRate = Math.max(85, Math.min(100, metrics.optimizationSuccessRate + (Math.random() - 0.5) * 1));
    }

    setupResourceAllocation() {
        // Monitor resource allocation
        setInterval(() => {
            this.updateBatteryManagement();
            this.updatePayloadDistribution();
        }, 15000); // Check every 15 seconds

        // Setup resource allocation UI
        this.setupResourceAllocationUI();
    }

    setupResourceAllocationUI() {
        // Create resource allocation dashboard
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;

        const resourceSection = document.createElement('section');
        resourceSection.className = 'dashboard-section';
        resourceSection.innerHTML = `
            <h2 class="section-title">Resource Allocation</h2>
            <div class="resource-overview">
                <div class="battery-management">
                    <h3>Battery Management</h3>
                    <div class="charging-stations" id="charging-stations">
                        <!-- Charging stations will be populated dynamically -->
                    </div>
                </div>
                <div class="payload-distribution">
                    <h3>Payload Distribution</h3>
                    <div class="payload-chart" id="payload-chart">
                        <!-- Payload distribution will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;

        dashboardGrid.appendChild(resourceSection);
        this.populateResourceAllocation();
    }

    populateResourceAllocation() {
        this.populateChargingStations();
        this.populatePayloadDistribution();
    }

    populateChargingStations() {
        const chargingStations = document.getElementById('charging-stations');
        if (!chargingStations) return;

        const stations = this.missionData.performanceOptimization.resourceAllocation.batteryManagement.chargingStations;
        
        chargingStations.innerHTML = stations.map(station => `
            <div class="charging-station">
                <div class="station-info">
                    <span class="station-id">${station.id}</span>
                    <span class="station-location">${station.location}</span>
                </div>
                <div class="station-capacity">
                    <div class="capacity-bar">
                        <div class="capacity-fill" style="width: ${(station.available / station.capacity) * 100}%"></div>
                    </div>
                    <span class="capacity-text">${station.available}/${station.capacity}</span>
                </div>
            </div>
        `).join('');
    }

    populatePayloadDistribution() {
        const payloadChart = document.getElementById('payload-chart');
        if (!payloadChart) return;

        const distribution = this.missionData.performanceOptimization.resourceAllocation.payloadDistribution.medicalSupplies.distribution;
        
        payloadChart.innerHTML = Object.entries(distribution).map(([supply, amount]) => `
            <div class="payload-item">
                <span class="supply-name">${supply}</span>
                <div class="supply-bar">
                    <div class="supply-fill" style="width: ${amount}%"></div>
                </div>
                <span class="supply-amount">${amount}%</span>
            </div>
        `).join('');
    }

    updateBatteryManagement() {
        const stations = this.missionData.performanceOptimization.resourceAllocation.batteryManagement.chargingStations;
        
        stations.forEach(station => {
            // Simulate battery usage and charging
            if (station.available < station.capacity) {
                station.available = Math.min(station.capacity, station.available + Math.random() * 0.5);
            }
        });
    }

    updatePayloadDistribution() {
        const distribution = this.missionData.performanceOptimization.resourceAllocation.payloadDistribution.medicalSupplies.distribution;
        
        // Simulate payload usage
        Object.keys(distribution).forEach(supply => {
            distribution[supply] = Math.max(0, Math.min(100, distribution[supply] + (Math.random() - 0.5) * 2));
        });
    }

    setupEfficiencyMonitoring() {
        // Monitor fleet efficiency metrics
        setInterval(() => {
            this.updateEfficiencyMetrics();
        }, 20000); // Check every 20 seconds

        // Setup efficiency monitoring UI
        this.setupEfficiencyMonitoringUI();
    }

    setupEfficiencyMonitoringUI() {
        // Create efficiency monitoring dashboard
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;

        const efficiencySection = document.createElement('section');
        efficiencySection.className = 'dashboard-section';
        efficiencySection.innerHTML = `
            <h2 class="section-title">Fleet Efficiency</h2>
            <div class="efficiency-overview">
                <div class="efficiency-metrics">
                    <div class="efficiency-metric">
                        <span class="metric-value">${this.missionData.performanceOptimization.efficiencyMetrics.fleetUtilization}%</span>
                        <span class="metric-label">Fleet Utilization</span>
                    </div>
                    <div class="efficiency-metric">
                        <span class="metric-value">${this.missionData.performanceOptimization.efficiencyMetrics.missionEfficiency}%</span>
                        <span class="metric-label">Mission Efficiency</span>
                    </div>
                    <div class="efficiency-metric">
                        <span class="metric-value">${this.missionData.performanceOptimization.efficiencyMetrics.fuelEfficiency}%</span>
                        <span class="metric-label">Fuel Efficiency</span>
                    </div>
                    <div class="efficiency-metric">
                        <span class="metric-value">${this.missionData.performanceOptimization.efficiencyMetrics.overallEfficiency}%</span>
                        <span class="metric-label">Overall Efficiency</span>
                    </div>
                </div>
            </div>
        `;

        dashboardGrid.appendChild(efficiencySection);
    }

    updateEfficiencyMetrics() {
        const metrics = this.missionData.performanceOptimization.efficiencyMetrics;
        
        // Simulate metric updates
        metrics.fleetUtilization = Math.max(70, Math.min(100, metrics.fleetUtilization + (Math.random() - 0.5) * 2));
        metrics.missionEfficiency = Math.max(85, Math.min(100, metrics.missionEfficiency + (Math.random() - 0.5) * 1));
        metrics.fuelEfficiency = Math.max(80, Math.min(100, metrics.fuelEfficiency + (Math.random() - 0.5) * 1.5));
        metrics.overallEfficiency = Math.max(80, Math.min(100, metrics.overallEfficiency + (Math.random() - 0.5) * 1));
    }

    setupOptimizationRecommendations() {
        // Setup optimization recommendations
        this.setupRecommendationsUI();
        this.setupRecommendationAlerts();
    }

    setupRecommendationsUI() {
        // Create recommendations dashboard
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;

        const recommendationsSection = document.createElement('section');
        recommendationsSection.className = 'dashboard-section';
        recommendationsSection.innerHTML = `
            <h2 class="section-title">Optimization Recommendations</h2>
            <div class="recommendations-list" id="recommendations-list">
                <!-- Recommendations will be populated dynamically -->
            </div>
        `;

        dashboardGrid.appendChild(recommendationsSection);
        this.populateRecommendations();
    }

    populateRecommendations() {
        const recommendationsList = document.getElementById('recommendations-list');
        if (!recommendationsList) return;

        const recommendations = this.missionData.performanceOptimization.optimizationRecommendations;
        
        recommendationsList.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item ${rec.priority}">
                <div class="recommendation-header">
                    <span class="recommendation-type">${rec.type}</span>
                    <span class="recommendation-priority ${rec.priority}">${rec.priority.toUpperCase()}</span>
                </div>
                <div class="recommendation-description">${rec.description}</div>
                <div class="recommendation-savings">Potential Savings: ${rec.potentialSavings}</div>
                <div class="recommendation-time">Implementation: ${rec.implementationTime}</div>
                <button class="btn btn--sm" onclick="app.applyRecommendation('${rec.type}')">Apply</button>
            </div>
        `).join('');
    }

    applyRecommendation(type) {
        this.showNotification(`Applying ${type} optimization...`, 'info');
        
        // Simulate recommendation application
        setTimeout(() => {
            this.showNotification(`${type} optimization applied successfully`, 'success');
        }, 2000);
    }

    setupRecommendationAlerts() {
        // Monitor for high-priority recommendations
        setInterval(() => {
            const highPriorityRecs = this.missionData.performanceOptimization.optimizationRecommendations
                .filter(rec => rec.priority === 'high');
            
            if (highPriorityRecs.length > 0) {
                this.showNotification(`High-priority optimization available: ${highPriorityRecs[0].type}`, 'warning');
            }
        }, 30000);
    }
}

class NavigationMaintenanceModel {
    constructor() {
        this.accuracyDegradationRate = 0.08; // 8% per 100 flight hours
        this.accuracyThreshold = 5; // 5m accuracy
        this.criticalThreshold = 50; // 50% health
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Life-Line Air Command App');
    const app = new LifeLineApp();
    console.log('✅ App initialized successfully');
    
    // Add keyboard shortcuts for power users
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('[data-screen="dashboard"]')?.click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('[data-screen="fleet"]')?.click();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('[data-screen="missions"]')?.click();
                    break;
                case '4':
                    e.preventDefault();
                    document.querySelector('[data-screen="inventory"]')?.click();
                    break;
                case '5':
                    e.preventDefault();
                    document.querySelector('[data-screen="mapping"]')?.click();
                    break;
                case 'e':
                    e.preventDefault();
                    document.getElementById('emergency-launch')?.click();
                    break;
            }
        }
    });
    
    // Add swipe gesture support for mobile
    let startX, startY, distX, distY;
    
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const touch = e.touches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const threshold = 100;
        const restraint = 50;
        
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
            if (distX > 0) {
                // Swipe right - previous screen
                app.navigatePrevious();
            } else {
                // Swipe left - next screen
                app.navigateNext();
            }
        }
        
        startX = null;
        startY = null;
        distX = null;
        distY = null;
    });
    
    // Add navigation methods to app instance
    app.navigateNext = function() {
        const screens = ['dashboard', 'fleet', 'missions', 'inventory', 'mapping'];
        const currentIndex = screens.indexOf(this.currentScreen);
        const nextIndex = (currentIndex + 1) % screens.length;
        const nextScreenBtn = document.querySelector(`[data-screen="${screens[nextIndex]}"]`);
        if (nextScreenBtn) nextScreenBtn.click();
    };
    
    app.navigatePrevious = function() {
        const screens = ['dashboard', 'fleet', 'missions', 'inventory', 'mapping'];
        const currentIndex = screens.indexOf(this.currentScreen);
        const prevIndex = currentIndex === 0 ? screens.length - 1 : currentIndex - 1;
        const prevScreenBtn = document.querySelector(`[data-screen="${screens[prevIndex]}"]`);
        if (prevScreenBtn) prevScreenBtn.click();
    };
    
    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
        app.showNotification('System error detected', 'error');
    });
    
    // Online/offline status monitoring
    window.addEventListener('online', () => {
        app.showNotification('Communication restored', 'success');
        const indicator = document.querySelector('.connection-status .status-indicator');
        if (indicator) {
            indicator.style.background = 'var(--communication-green)';
        }
    });
    
    window.addEventListener('offline', () => {
        app.showNotification('Communication lost - Operating in offline mode', 'warning');
        const indicator = document.querySelector('.connection-status .status-indicator');
        if (indicator) {
            indicator.style.background = 'var(--alert-red)';
        }
    });
});