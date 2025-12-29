#![no_std]

/// 累進課税による所得税の簡易計算
///
/// **注意**: これは教育目的の簡易計算です。実際の所得税計算とは以下の点で異なります：
/// - 各種所得控除（基礎控除、給与所得控除など）が考慮されていません
/// - 復興特別所得税が含まれていません
/// - 住民税は計算されていません
///
/// # Arguments
/// * `income` - 年収（円）
///
/// # Returns
/// 計算された所得税額（円）
pub fn calculate_progressive_tax(income: f64) -> f64 {
    // 2024年時点の所得税率に基づく累進課税の簡易計算
    if income <= 1_950_000.0 {
        income * 0.05
    } else if income <= 3_300_000.0 {
        97_500.0 + (income - 1_950_000.0) * 0.10
    } else if income <= 6_950_000.0 {
        232_500.0 + (income - 3_300_000.0) * 0.20
    } else if income <= 9_000_000.0 {
        962_500.0 + (income - 6_950_000.0) * 0.23
    } else {
        1_434_000.0 + (income - 9_000_000.0) * 0.33
    }
}

/// 単純な税率による計算
///
/// # Arguments
/// * `income` - 課税対象所得（円）
/// * `rate` - 税率（0.0〜1.0）
///
/// # Returns
/// 計算された税額（円）
pub fn calculate_simple_tax(income: f64, rate: f64) -> f64 {
    income * rate
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_progressive_tax_lowest_bracket() {
        let tax = calculate_progressive_tax(1_000_000.0);
        assert_eq!(tax, 50_000.0); // 5%
    }

    #[test]
    fn test_progressive_tax_second_bracket() {
        let tax = calculate_progressive_tax(3_000_000.0);
        assert_eq!(tax, 202_500.0); // 97,500 + 1,050,000 * 0.10
    }

    #[test]
    fn test_simple_tax() {
        let tax = calculate_simple_tax(1_000_000.0, 0.1);
        assert_eq!(tax, 100_000.0);
    }
}
