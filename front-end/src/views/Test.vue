<template>
  <div class="test-container">
    <h1 class="ui header center aligned main-title">Staff Training Quiz</h1>
    <div v-if="loading" class="ui active centered inline loader"></div>
    <div v-else-if="responses.length < 3" class="ui message warning center aligned empty-state">
      <div class="header">Not Enough Data</div>
      <p>Please add at least 3 responses in the library to start the multiple-choice training quiz!</p>
      <router-link to="/responses/new" class="ui button primary">Add a Response</router-link>
    </div>
    
    <!-- Quiz Finished View -->
    <div v-else-if="isQuizFinished" class="ui segment center aligned finished-state">
      <h2 class="ui icon header">
        <i class="trophy yellow icon"></i>
        <div class="content">
          Quiz Completed!
          <div class="sub header mt-3">You have answered all {{ questionPool.length }} questions.</div>
        </div>
      </h2>
      <div class="ui two statistics centered" style="margin-top: 40px; margin-bottom: 40px;">
        <div class="green statistic">
          <div class="value">{{ correctAnswers }}</div>
          <div class="label">Correct</div>
        </div>
        <div class="red statistic">
          <div class="value">{{ questionPool.length - correctAnswers }}</div>
          <div class="label">Incorrect</div>
        </div>
      </div>
      <button class="ui huge primary button" @click="startQuiz()">
        Retake Quiz
      </button>
    </div>

    <!-- Active Quiz View -->
    <div v-else>
      <div class="ui grid centered">
        <div class="eight wide column">
          <!-- Score Board -->
          <div class="score-board">
            <div class="ui statistic">
              <div class="value">{{ correctAnswers }} / {{ questionPool.length }}</div>
              <div class="label">Score</div>
            </div>
            <p style="text-align: center; color: #7f8c8d; font-weight: bold; margin-top: 10px;">
              Question {{ currentIndex + 1 }} of {{ questionPool.length }}
            </p>
          </div>
          
          <!-- Flashcard -->
          <div class="flashcard">
            <div class="flag-icon">
              <i class="headphones icon huge"></i>
            </div>
            <div class="hint">Customer Issue Code:</div>
            <div class="word-display">{{ currentResponse.issueCode }}</div>
          </div>

          <!-- Answer Options -->
          <div class="ui form">
            <div v-for="(option, index) in options" :key="index" class="field">
              <button 
                class="ui large fluid button option-btn" 
                :class="{
                  'primary': !isEvaluated,
                  'green': isEvaluated && option._id === currentResponse._id,
                  'red': isEvaluated && option._id === selectedOption?._id && option._id !== currentResponse._id,
                  'disabled': isEvaluated && option._id !== currentResponse._id && option._id !== selectedOption?._id
                }"
                @click="onSelectOption(option)"
                :disabled="isEvaluated"
              >
                {{ option.responseText }}
              </button>
            </div>

            <button 
              v-if="isEvaluated"
              class="ui large fluid button modern-btn teal" 
              @click="nextQuestion()"
            >
              {{ currentIndex + 1 === questionPool.length ? 'View Results' : 'Next Question' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Test',
  data() {
    return {
      responses: [],
      questionPool: [],
      currentIndex: 0,
      currentResponse: {},
      options: [],
      selectedOption: null,
      correctAnswers: 0,
      isEvaluated: false,
      isQuizFinished: false,
      loading: true
    };
  },
  async mounted() {
    this.responses = await api.getResponses();
    this.loading = false;
    if (this.responses.length >= 3) {
      this.startQuiz();
    }
  },
  methods: {
    startQuiz() {
      // Create a randomized pool of all available responses
      this.questionPool = [...this.responses].sort(() => 0.5 - Math.random());
      this.currentIndex = 0;
      this.correctAnswers = 0;
      this.isQuizFinished = false;
      this.loadQuestion();
    },
    loadQuestion() {
      this.currentResponse = this.questionPool[this.currentIndex];
      
      // Pick up to 3 incorrect responses from the FULL list
      let incorrectOptions = this.responses.filter(r => r._id !== this.currentResponse._id);
      incorrectOptions = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      // Combine correct and incorrect, then shuffle
      const allOptions = [this.currentResponse, ...incorrectOptions];
      this.options = allOptions.sort(() => 0.5 - Math.random());
      
      this.isEvaluated = false;
      this.selectedOption = null;
    },
    onSelectOption(option) {
      if (this.isEvaluated) return;
      
      this.selectedOption = option;
      this.isEvaluated = true;
      
      if (option._id === this.currentResponse._id) {
        this.correctAnswers++;
        this.flash('Successfull', 'success', { timeout: 1500 });
      } else {
        this.flash('Not correct! Please check the answer in blue.', 'error', { timeout: 3000 });
      }
    },
    nextQuestion() {
      this.currentIndex++;
      if (this.currentIndex >= this.questionPool.length) {
        // Quiz is fully completed
        this.isQuizFinished = true;
      } else {
        // Load the next question in the pool
        this.loadQuestion();
      }
    }
  }
};
</script>

<style scoped>
.test-container {
  margin-top: 20px;
  animation: fadeIn 0.5s ease-in-out;
}

.main-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.score-board {
  text-align: center;
  margin-bottom: 20px;
}

.flashcard {
  background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
  border-radius: 15px;
  padding: 20px 15px;
  text-align: center;
  color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.flag-icon {
  margin-bottom: 5px;
  opacity: 0.9;
}

.word-display {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
  word-wrap: break-word;
}

.hint {
  font-size: 1rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.option-btn {
  margin-bottom: 10px !important;
  text-align: left !important;
  white-space: normal !important;
  height: auto !important;
  padding: 12px 15px !important;
  line-height: 1.3 !important;
  font-size: 1rem !important;
}

.modern-btn {
  margin-top: 20px !important;
  border-radius: 10px !important;
}

.finished-state {
  padding: 50px 20px !important;
  border-radius: 15px !important;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
  margin-top: 30px;
}

.mt-3 {
  margin-top: 15px !important;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.empty-state {
  margin-top: 50px;
  padding: 50px !important;
  border-radius: 15px !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
}

/* Force standard center alignment for the statistics numbers and labels */
.ui.statistics .statistic {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}
.ui.statistics .statistic > .label {
  text-align: center !important;
  margin: 0 auto !important;
}
.finished-state button {
  margin: 0 auto !important;
  display: inline-block !important;
}
</style>
