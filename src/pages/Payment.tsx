import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Wallet, Shield, Check, Plus, X, ChevronDown } from 'lucide-react';
import { SharedTopNav } from '../components/navigation/SharedTopNav';
import { ALL_COUNTRIES } from '../config/countries-full';
import { BankAccountModal } from '../components/BankAccountModal';
import { PhoneInput } from '../components/PhoneInput';

// ALL African Mobile Money Operators
const MOBILE_MONEY_OPERATORS: Record<string, string[]> = {
  'Kenya': ['M-Pesa', 'Airtel Money'],
  'Tanzania': ['M-Pesa (Vodacom)', 'Tigo Pesa', 'Airtel Money', 'Halopesa'],
  'Uganda': ['MTN Mobile Money', 'Airtel Money'],
  'Rwanda': ['MTN Mobile Money', 'Airtel Money'],
  'Ghana': ['MTN Mobile Money', 'Vodafone Cash', 'AirtelTigo Money'],
  'Nigeria': ['MTN Mobile Money', 'Airtel Money', 'Glo Cash'],
  'Côte d\'Ivoire': ['Orange Money', 'MTN Mobile Money', 'Moov Money', 'Wave'],
  'Senegal': ['Orange Money', 'Free Money', 'Wave', 'Wizall'],
  'Mali': ['Orange Money', 'Moov Money'],
  'Burkina Faso': ['Orange Money', 'Moov Money'],
  'Benin': ['MTN Mobile Money', 'Moov Money'],
  'Togo': ['Togocel TMoney', 'Moov Money'],
  'Cameroon': ['MTN Mobile Money', 'Orange Money'],
  'South Africa': ['Vodacom M-Pesa', 'MTN Mobile Money'],
  'Zimbabwe': ['Ecocash', 'OneMoney'],
  'Zambia': ['MTN Mobile Money', 'Airtel Money'],
  'Mozambique': ['M-Pesa (Vodacom)', 'e-Mola'],
  'DRC': ['M-Pesa (Vodacom)', 'Orange Money', 'Airtel Money']
};

// Major African Banks
const AFRICAN_BANKS = [
  'Standard Bank', 'Equity Bank', 'KCB Bank', 'Stanbic Bank', 'Ecobank',
  'Access Bank', 'GTBank', 'Zenith Bank', 'First Bank of Nigeria',
  'Absa Bank', 'FNB', 'Nedbank', 'Capitec Bank', 'Barclays Africa',
  'Bank of Africa', 'UBA', 'Diamond Bank', 'Société Générale', 'Other'
];

interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

export function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const total = searchParams.get('total') || '0';
  const service = searchParams.get('service') || 'booking';

  // State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', name: 'Visa ending in 4242', details: 'Expires 12/25', isDefault: true },
    { id: '2', type: 'mobile', name: 'M-Pesa', details: '+254 712 345 678', isDefault: false }
  ]);
  
  const [selectedMethod, setSelectedMethod] = useState<string>('1');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Wallet
  const [walletBalance, setWalletBalance] = useState(2500);
  
  // Add payment form
  const [addType, setAddType] = useState<'card' | 'mobile' | 'bank' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [mobileCountry, setMobileCountry] = useState('Kenya');
  const [mobileOperator, setMobileOperator] = useState('M-Pesa');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  
  // Top-up
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpMethod, setTopUpMethod] = useState<string>('');

  const handleAddPayment = () => {
    if (addType === 'card' && cardNumber && cardName) {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: 'card',
        name: `Card ending in ${cardNumber.slice(-4)}`,
        details: `Expires ${cardExpiry}`,
        isDefault: saveAsDefault
      };
      if (saveAsDefault) {
        setPaymentMethods(paymentMethods.map(m => ({ ...m, isDefault: false })).concat(newMethod));
      } else {
        setPaymentMethods([...paymentMethods, newMethod]);
      }
      setSelectedMethod(newMethod.id);
      resetAddForm();
      setShowAddModal(false);
    } else if (addType === 'mobile' && mobileNumber) {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: 'mobile',
        name: mobileOperator,
        details: mobileNumber,
        isDefault: saveAsDefault
      };
      if (saveAsDefault) {
        setPaymentMethods(paymentMethods.map(m => ({ ...m, isDefault: false })).concat(newMethod));
      } else {
        setPaymentMethods([...paymentMethods, newMethod]);
      }
      setSelectedMethod(newMethod.id);
      resetAddForm();
      setShowAddModal(false);
    } else if (addType === 'bank' && accountNumber && bankName) {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: 'bank',
        name: bankName,
        details: `Account ${accountNumber.slice(-4)}`,
        isDefault: saveAsDefault
      };
      if (saveAsDefault) {
        setPaymentMethods(paymentMethods.map(m => ({ ...m, isDefault: false })).concat(newMethod));
      } else {
        setPaymentMethods([...paymentMethods, newMethod]);
      }
      setSelectedMethod(newMethod.id);
      resetAddForm();
      setShowBankModal(false);
    }
  };

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (amount >= 10) {
      setWalletBalance(walletBalance + amount);
      setShowTopUpModal(false);
      setTopUpAmount('');
      alert(`Successfully added $${amount} to your wallet!`);
    }
  };

  const resetAddForm = () => {
    setAddType(null);
    setCardNumber('');
    setCardExpiry('');
    setCardCVV('');
    setCardName('');
    setMobileNumber('');
    setAccountNumber('');
    setBankName('');
    setSaveAsDefault(false);
  };

  const handlePayment = () => {
    if (!selectedMethod && walletBalance < parseFloat(total)) {
      alert('Please select a payment method');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set('payment', 'success');
      navigate(`/checkout?${params.toString()}`);
    }, 2000);
  };

  const canPayWithWallet = walletBalance >= parseFloat(total);

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedTopNav simplified={true} />

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Details</span>
            </div>
            <div className="flex-1 h-1 bg-blue-600 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">2</div>
              <span className="text-sm font-medium">Payment</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">3</div>
              <span className="text-sm text-gray-600">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-8">Payment Method</h1>

              {/* BridgeWallet with Top-Up */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold">BridgeWallet</h2>
                  <button
                    onClick={() => setShowTopUpModal(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    + Add Funds
                  </button>
                </div>
                <button
                  onClick={() => setSelectedMethod('wallet')}
                  disabled={!canPayWithWallet}
                  className={`w-full p-6 rounded-xl border-2 text-left ${
                    selectedMethod === 'wallet' ? 'border-blue-600 bg-blue-50' :
                    !canPayWithWallet ? 'border-gray-200 bg-gray-50 opacity-60' :
                    'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Wallet className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">Pay from Wallet</h3>
                      <p className="text-sm text-gray-600 mb-2">Instant payment</p>
                      <div className={`font-semibold ${canPayWithWallet ? 'text-green-600' : 'text-red-600'}`}>
                        Balance: ${walletBalance.toFixed(2)}
                      </div>
                    </div>
                    {selectedMethod === 'wallet' && <Check className="w-6 h-6 text-blue-600" />}
                  </div>
                </button>
              </div>

              {/* Saved Payment Methods */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Saved Payment Methods</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left ${
                        selectedMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {method.type === 'card' ? <CreditCard className="w-6 h-6" /> :
                             method.type === 'mobile' ? <Smartphone className="w-6 h-6" /> :
                             <Building2 className="w-6 h-6" />}
                          </div>
                          <div>
                            <div className="font-semibold">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.details}</div>
                            {method.isDefault && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Default</span>
                            )}
                          </div>
                        </div>
                        {selectedMethod === method.id && <Check className="w-6 h-6 text-blue-600" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Payment Method */}
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Payment Method
              </button>

              {/* Add Bank Account */}
              <button
                onClick={() => setShowBankModal(true)}
                className="w-full mt-3 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 font-semibold flex items-center justify-center gap-2"
              >
                <Building2 className="w-5 h-5" />
                Link Bank Account
              </button>

              {/* Security */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <strong>Secure payment.</strong> SSL encryption. Card details never stored.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Summary</h2>
            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(parseFloat(total) * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${(parseFloat(total) * 0.1).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl font-bold mb-8">
              <span>Total</span>
              <span className="text-blue-600">${total}</span>
            </div>
            <button
              onClick={handlePayment}
              disabled={!selectedMethod && !canPayWithWallet || processing}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 mb-3"
            >
              {processing ? 'Processing...' : `Complete Payment - $${total}`}
            </button>
            <p className="text-center text-xs text-gray-500">
              By completing, you agree to our Terms & Privacy
            </p>
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold">Add Payment Method</h2>
              <button onClick={() => { setShowAddModal(false); resetAddForm(); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {!addType && (
                <div className="space-y-3">
                  <button onClick={() => setAddType('card')} className="w-full p-4 border-2 rounded-xl hover:border-blue-500 hover:bg-blue-50 text-left">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-8 h-8" />
                      <div>
                        <div className="font-bold">Credit/Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                  </button>
                  <button onClick={() => setAddType('mobile')} className="w-full p-4 border-2 rounded-xl hover:border-blue-500 hover:bg-blue-50 text-left">
                    <div className="flex items-center gap-4">
                      <Smartphone className="w-8 h-8" />
                      <div>
                        <div className="font-bold">Mobile Money</div>
                        <div className="text-sm text-gray-600">M-Pesa, Orange Money, MTN, etc.</div>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {addType === 'card' && (
                <div className="space-y-4">
                  <button onClick={() => setAddType(null)} className="text-blue-600 text-sm mb-4">← Back</button>
                  <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="px-4 py-3 border rounded-lg" />
                    <input type="text" placeholder="CVV" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} className="px-4 py-3 border rounded-lg" />
                  </div>
                  <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={saveAsDefault} onChange={(e) => setSaveAsDefault(e.target.checked)} className="w-5 h-5" />
                    <span className="text-sm">Set as default payment method</span>
                  </label>
                  <button onClick={handleAddPayment} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                    Add Card
                  </button>
                </div>
              )}

              {addType === 'mobile' && (
                <div className="space-y-4">
                  <button onClick={() => setAddType(null)} className="text-blue-600 text-sm mb-4">← Back</button>
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Country</label>
                    <select value={mobileCountry} onChange={(e) => { setMobileCountry(e.target.value); setMobileOperator(MOBILE_MONEY_OPERATORS[e.target.value][0]); }} className="w-full px-4 py-3 border rounded-lg">
                      {Object.keys(MOBILE_MONEY_OPERATORS).map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Operator</label>
                    <select value={mobileOperator} onChange={(e) => setMobileOperator(e.target.value)} className="w-full px-4 py-3 border rounded-lg">
                      {MOBILE_MONEY_OPERATORS[mobileCountry].map(op => (
                        <option key={op} value={op}>{op}</option>
                      ))}
                    </select>
                  </div>
                  <PhoneInput
                    value={mobileNumber}
                    onChange={setMobileNumber}
                    label="Mobile Money Number"
                    required
                  />
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={saveAsDefault} onChange={(e) => setSaveAsDefault(e.target.checked)} className="w-5 h-5" />
                    <span className="text-sm">Set as default payment method</span>
                  </label>
                  <button onClick={handleAddPayment} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                    Add Mobile Money
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bank Account Modal */}
      {showBankModal && (
        <BankAccountModal
          onClose={() => setShowBankModal(false)}
          onAdd={(account) => {
            setPaymentMethods([...paymentMethods, account]);
            setShowBankModal(false);
          }}
        />
      )}

      {/* Top-Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold">Add Funds to Wallet</h2>
              <button onClick={() => setShowTopUpModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount (min $10)</label>
                <input
                  type="number"
                  placeholder="100"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg text-lg"
                  min="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select value={topUpMethod} onChange={(e) => setTopUpMethod(e.target.value)} className="w-full px-4 py-3 border rounded-lg">
                  <option value="">Select method</option>
                  {paymentMethods.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleTopUp}
                disabled={!topUpAmount || parseFloat(topUpAmount) < 10 || !topUpMethod}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                Add ${topUpAmount || '0'} to Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
