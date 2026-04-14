<template>
  <div class="statistics-container">
    <h1 class="ui header center aligned main-title">Helpdesk Statistics</h1>
    <div v-if="loading" class="ui active centered inline loader"></div>
    <div v-else>
      <div class="ui grid centered">
        <div class="ten wide column">
          <div class="ui two statistics">
            <div class="statistic">
              <div class="value">{{ totalResponses }}</div>
              <div class="label">Total Responses</div>
            </div>
            <div class="statistic">
              <div class="value">{{ Object.keys(categoryCounts).length }}</div>
              <div class="label">Categories</div>
            </div>
          </div>
          
          <div class="ui divider segment-divider"></div>

          <div style="text-align: center; margin-bottom: 25px;">
            <div class="ui buttons">
              <button class="ui button" :class="{ active: viewMode === 'list', blue: viewMode === 'list' }" @click="viewMode = 'list'">
                <i class="list icon"></i> Standard List
              </button>
              <div class="or"></div>
              <button class="ui button" :class="{ active: viewMode === 'chart', blue: viewMode === 'chart' }" @click="viewMode = 'chart'">
                <i class="chart pie icon"></i> Visual Chart
              </button>
            </div>
          </div>

          <!-- List View -->
          <div v-if="viewMode === 'list' && totalResponses > 0">
            <h3 class="ui header">Responses by Category</h3>
            <div class="ui segments" style="animation: fadeIn 0.3s ease-out;">
              <div class="ui segment" v-for="(count, category) in categoryCounts" :key="category">
                <div class="category-row">
                  <span class="category-name">{{ category }}</span>
                  <div class="ui left pointing label category-count">
                    {{ count }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chart View -->
          <div v-else-if="viewMode === 'chart' && totalResponses > 0" style="animation: fadeIn 0.3s ease-out; text-align: center; margin-bottom: 40px;">
            <h3 class="ui header" style="margin-bottom: 30px;">Visual Breakdown</h3>
            
            <div class="pie-chart-wrapper">
              <div class="pie-chart" :style="pieChartStyle"></div>
            </div>

            <!-- 2 by 2 Legend -->
            <div class="chart-legend-container">
              <div v-for="item in chartData" :key="item.name" class="chart-legend-item">
                <span class="color-box" :style="{ backgroundColor: item.color }"></span>
                <span>{{ item.name }} <strong>({{ item.percentage }}% | Count: {{ item.count }})</strong></span>
              </div>
            </div>
            
          </div>

          <!-- Empty State -->
          <div class="ui segment center aligned" v-if="totalResponses === 0">
            <p>No statistics available yet. Add some responses!</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Statistics',
  data() {
    return {
      responses: [],
      loading: true,
      viewMode: 'chart'
    };
  },
  computed: {
    totalResponses() {
      return this.responses.length;
    },
    categoryCounts() {
      return this.responses.reduce((acc, response) => {
        const cat = response.category || 'Uncategorized';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});
    },
    chartData() {
      const colors = ['#f1c40f', '#2ecc71', '#e74c3c', '#3498db', '#9b59b6', '#e67e22', '#1abc9c', '#34495e'];
      let data = [];
      let i = 0;
      let currentPct = 0;
      
      for(let cat in this.categoryCounts) {
        let count = this.categoryCounts[cat];
        let pct = (count / this.totalResponses) * 100;
        let roundedPct = Math.round(pct);
        let endPct = currentPct + pct;

        data.push({
          name: cat,
          count: count,
          percentage: roundedPct,
          color: colors[i % colors.length],
          startPct: currentPct,
          endPct: endPct
        });
        
        currentPct = endPct;
        i++;
      }
      return data;
    },
    pieChartStyle() {
      if (this.totalResponses === 0) return '';
      let parts = this.chartData.map(d => `${d.color} ${d.startPct}% ${d.endPct}%`);
      return `background: conic-gradient(${parts.join(', ')});`;
    }
  },
  async mounted() {
    this.responses = await api.getResponses();
    this.loading = false;
  }
};
</script>

<style scoped>
.statistics-container {
  margin-top: 40px;
  animation: fadeIn 0.5s ease-in-out;
}
.main-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.segment-divider {
  margin: 40px 0;
}
.category-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
}
.category-name {
  font-weight: bold;
}
.category-count {
  font-size: 1rem !important;
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* PIE CHART WRAPPER */
.pie-chart-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 10px auto 30px;
}

.pie-chart {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  animation: scaleIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chart-legend-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  max-width: 550px;
  margin: 0 auto;
}

.chart-legend-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  font-size: 1.05rem;
}

.color-box {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  border-radius: 50%;
}

@keyframes scaleIn {
  from { transform: scale(0) rotate(-90deg); opacity: 0; }
  to { transform: scale(1) rotate(0); opacity: 1; }
}
</style>
