import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

// Dummy data for demonstration. In real app, data would come from state or backend.
const DUMMY_EARNINGS = 12500.51;
const DUMMY_TRANSACTIONS = [
  { id: '1', date: '2024-06-01', amount: 455.55, source: 'Online Sales' },
  { id: '2', date: '2024-06-02', amount: 320.75, source: 'Consulting' },
  { id: '3', date: '2024-06-04', amount: 1200.00, source: 'Retail' },
  { id: '4', date: '2024-06-05', amount: 905.25, source: 'Affiliates' },
  { id: '5', date: '2024-06-06', amount: 675.90, source: 'Wholesale' },
];

const DUMMY_EARNINGS_TREND = [
  { label: 'Jan', value: 2000 },
  { label: 'Feb', value: 3000 },
  { label: 'Mar', value: 3500 },
  { label: 'Apr', value: 2500 },
  { label: 'May', value: 3000 },
  { label: 'Jun', value: 12500.51 / 2 },
];

// PUBLIC_INTERFACE
export default function MainContainer({ navigation }) {
  const [totalEarnings] = useState(DUMMY_EARNINGS);
  const [transactions] = useState(DUMMY_TRANSACTIONS);
  const [earningsTrend] = useState(DUMMY_EARNINGS_TREND);

  // PUBLIC_INTERFACE
  function handleNavigateReports() {
    // Example navigation, would be replaced by actual react-navigation usage
    if (navigation && navigation.navigate) {
      navigation.navigate('Reports');
    }
  }

  // PUBLIC_INTERFACE
  function handleNavigateAddTransaction() {
    if (navigation && navigation.navigate) {
      navigation.navigate('AddTransaction');
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>RevenueTrack Pro</Text>
      </View>

      {/* SUMMARY SECTION */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Earnings</Text>
        <Text style={styles.summaryValue}>${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
      </View>

      {/* CHART SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Earnings Trend</Text>
        <EarningsChart data={earningsTrend} />
      </View>

      {/* RECENT TRANSACTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions.slice(0, 4)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <View style={styles.transactionRow}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionSource}>{item.source}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
            </View>
          }
        />
      </View>

      {/* NAVIGATION BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNavigateReports}>
          <Text style={styles.buttonText}>View Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accentButton} onPress={handleNavigateAddTransaction}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/**
 * EarningsChart
 * Simple bar chart for earnings trend visualization.
 * Replace with charting library in production for more advanced charts.
 */
// PUBLIC_INTERFACE
function EarningsChart({ data }) {
  // Find maximum value for Y-scale
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartBarRow}>
        {data.map((d, idx) => (
          <View key={idx} style={styles.chartBarItem}>
            <View
              style={[
                styles.chartBar,
                {
                  height: `${(d.value / maxValue) * 100}%`,
                  backgroundColor: styles.chartBar.backgroundColor,
                }
              ]}
            />
            <Text style={styles.chartLabel}>{d.label}</Text>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 8 }}>
        <Text style={styles.chartCaption}>Last 6 months</Text>
      </View>
    </View>
  );
}

const COLORS = {
  primary: '#2E86C1',
  secondary: '#F2F3F4',
  accent: '#28B463',
  text: '#252525',
  textSecondary: '#3A506B',
  white: '#FFFFFF',
  cardShadow: 'rgba(46,134,193,0.13)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: 24,
    paddingHorizontal: 18,
  },
  header: {
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 0.5,
    marginBottom: 14,
  },
  appTitle: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 13,
    padding: 22,
    marginVertical: 12,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  summaryLabel: {
    color: COLORS.secondary,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  summaryValue: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 9,
  },
  section: {
    paddingVertical: 14,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 9,
  },
  chartContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    minHeight: 190,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 6,
  },
  chartBarRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 90,
    marginBottom: 8,
    marginTop: 8,
  },
  chartBarItem: {
    alignItems: 'center',
    width: 36,
  },
  chartBar: {
    width: 18,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginBottom: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  chartCaption: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 7,
    marginBottom: 7,
    padding: 11,
    shadowColor: COLORS.cardShadow,
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionInfo: {
    flexDirection: 'column',
  },
  transactionSource: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 8,
    flex: 1,
    alignItems: 'center',
  },
  accentButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
