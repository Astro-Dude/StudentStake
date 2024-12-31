import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getUserBalance, updateUserBalance } from '../firebase-db.js';

const firebaseConfig = {
    apiKey: "AIzaSyAh391JmV8sMQMsG4GM-d5YYDW9B2Wm02Q",
    authDomain: "student-stake.firebaseapp.com",
    projectId: "student-stake",
    storageBucket: "student-stake.firebasestorage.app",
    messagingSenderId: "30261368491",
    appId: "1:30261368491:web:15cfe37fda0a38620489ee",
    measurementId: "G-D7WLWT2CFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

class MineGame {
    constructor() {
        this.gridSize = 3;
        this.mineCount = 3;
        this.grid = [];
        this.revealed = [];
        this.gameActive = false;
        this.betAmount = 0;
        this.rewardPerCell = 1/3; // 10% reward per safe cell
        this.revealedCount = 0;
        
        this.setupEventListeners();
        this.setupAuth();
    }

    setupAuth() {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = '../index.html';
            }
        });

        const logout = document.getElementById('logout');
        logout.addEventListener('click', async () => {
            await auth.signOut();
            window.location.href = "../index.html";
        });
    }

    setupEventListeners() {
        const startButton = document.getElementById('start-game');
        const cashoutButton = document.getElementById('cashout');
        const betInput = document.getElementById('bet-amount');

        startButton.addEventListener('click', () => this.startGame());
        cashoutButton.addEventListener('click', () => this.cashout());

        // Menu toggle
        let menu = document.querySelector("#menu-icon");
        let nav = document.querySelector(".nav");

        menu.onclick = () => {
            menu.classList.toggle("bx-x");
            nav.classList.toggle("active");
        };
    }

    async startGame() {
        const betInput = document.getElementById('bet-amount');
        const betAmount = Number(betInput.value);
        const user = auth.currentUser;

        if (!user) {
            alert('Please login to play');
            return;
        }

        const balance = await getUserBalance(user.uid);
        if (betAmount <= 9 || betAmount > balance) {
            alert('Invalid bet amount. Minimum bet is 10 coins');
            return;
        }

        this.betAmount = betAmount;
        this.gameActive = true;
        this.revealedCount = 0;
        this.grid = this.createGrid();
        this.revealed = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(false));
        
        document.getElementById('start-game').disabled = true;
        document.getElementById('bet-amount').disabled = true;
        document.getElementById('cashout').disabled = false;
        this.renderGrid();
        
        await updateUserBalance(user.uid, balance - betAmount);
        this.updateStatus(`Bet placed: ${betAmount} coins`);
    }

    createGrid() {
        const grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(false));
        let minesToPlace = this.mineCount;
        
        while (minesToPlace > 0) {
            const x = Math.floor(Math.random() * this.gridSize);
            const y = Math.floor(Math.random() * this.gridSize);
            if (!grid[y][x]) {
                grid[y][x] = true;
                minesToPlace--;
            }
        }
        return grid;
    }

    renderGrid() {
        const gridContainer = document.getElementById('game-grid');
        gridContainer.innerHTML = '';
        
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('button');
                cell.className = 'cell';
                if (this.revealed[y][x]) {
                    cell.classList.add('revealed');
                    if (this.grid[y][x]) {
                        cell.classList.add('mine');
                    } else {
                        cell.classList.add('safe');
                    }
                }
                cell.addEventListener('click', () => this.handleCellClick(x, y));
                gridContainer.appendChild(cell);
            }
        }
    }

    async handleCellClick(x, y) {
        if (!this.gameActive || this.revealed[y][x]) return;

        this.revealed[y][x] = true;
        if (this.grid[y][x]) {
            this.gameActive = false;
            this.showAllMines();
            this.updateStatus('Game Over! You hit a mine!');
            document.getElementById('cashout').disabled = true;
            document.getElementById('start-game').disabled = false;
            document.getElementById('bet-amount').disabled = false;
            onAuthStateChanged(auth, async (user) => {
                const balance = await getUserBalance(user.uid);
                const statsSection = document.querySelector('.stats');
                if (statsSection) {
                    statsSection.innerHTML = `Balance: ${balance}`;
                }
            });
        } else {
            this.revealedCount++;
            const potentialWin = this.calculateWinnings();
            this.updateStatus(`Safe! Potential win: ${potentialWin} coins`);
        }
        this.renderGrid();
    }

    showAllMines() {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x]) {
                    this.revealed[y][x] = true;
                }
            }
        }
        this.renderGrid();
    }

    calculateWinnings() {
        return Math.floor(this.betAmount * ((this.rewardPerCell * this.revealedCount)));
    }

    async cashout() {
        if (!this.gameActive) return;
        
        const winAmount = this.calculateWinnings();
        const user = auth.currentUser;
        
        if (user) {
            const currentBalance = await getUserBalance(user.uid);
            await updateUserBalance(user.uid, currentBalance + winAmount);
            this.updateStatus(`Cashed out! Won ${winAmount} coins`);
        }

        this.gameActive = false;
        document.getElementById('cashout').disabled = true;
        document.getElementById('start-game').disabled = false;
        document.getElementById('bet-amount').disabled = false;
    }

    updateStatus(message) {
        document.getElementById('game-status').textContent = message;
        onAuthStateChanged(auth, async (user) => {
            const balance = await getUserBalance(user.uid);
            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                statsSection.innerHTML = `Balance: ${balance}`;
            }

        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MineGame();
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
          window.location.href = '../index.html';
        } else {
          console.log('Logged in user:', user.email);
          
          const balance = await getUserBalance(user.uid);
          const statsSection = document.querySelector('.stats');
          if (statsSection) {
            statsSection.innerHTML = `Balance: ${balance}`;
          }
        }
    });
});