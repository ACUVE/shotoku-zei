use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[wasm_bindgen]
pub fn calculate_tax(income: f64, rate: f64) -> f64 {
    income * rate
}

#[wasm_bindgen]
pub struct TaxCalculator {
    base_rate: f64,
}

#[wasm_bindgen]
impl TaxCalculator {
    #[wasm_bindgen(constructor)]
    pub fn new(base_rate: f64) -> TaxCalculator {
        log(&format!(
            "TaxCalculator initialized with rate: {}",
            base_rate
        ));
        TaxCalculator { base_rate }
    }

    /// 単純な税率による計算
    ///
    /// # Arguments
    /// * `income` - 課税対象所得（円）
    pub fn calculate(&self, income: f64) -> f64 {
        income * self.base_rate
    }

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
    pub fn calculate_progressive(&self, income: f64) -> f64 {
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
}
