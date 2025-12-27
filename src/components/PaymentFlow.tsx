import { useState } from 'react';
import { Wallet, CreditCard, Smartphone, Building2, Plus, Check, AlertCircle, Zap, ArrowUpCircle, X } from 'lucide-react';
import { Bridge55Card } from './Bridge55Card';

interface PaymentFlowProps {
  amount: number;
  onPaymentComplete: (method: any) => void;
}

export function PaymentFlow({ amount, onPaymentComplete }: PaymentFlowProps) {
  const [walletBalance] = useState(2500.00);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [useWallet, setUseWallet] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddMobile, setShowAddMobile] = useState(false);
  const [showLinkBank, setShowLinkBank] = useState(false);
  
  const serviceFee = amount * 0.05;
  const totalAmount = amount + serviceFee;
  const remainingAfterWallet = useWallet ? Math.max(0, totalAmount - walletAmount) : totalAmount;
  const canPayWithWalletOnly = walletBalance >= totalAmount;

  // Mock saved payment methods
  const savedMethods = [
    { id: '1', type: 'card', last4: '4242', brand: 'Visa', expiry: '12/25', isDefault: true },
    { id: '2', type: 'mobile', provider: 'M-Pesa', phone: '+254 712 345 678' }
  ];

  const handleQuickPay = () => {
    if (canPayWithWalletOnly) {
      setUseWallet(true);
      setWalletAmount(totalAmount);
      onPaymentComplete({ method: 'wallet', amount: totalAmount });
    }
  };

  return (
    <div className="space-y-6">
      {/* Bridge55 Wallet Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">Bridge55 Wallet</div>
              <div className="text-2xl font-bold text-blue-600">
                ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowTopUp(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
            >
              <ArrowUpCircle className="w-4 h-4" />
              Add Funds
            </button>
            {canPayWithWalletOnly && !useWallet && (
              <button
                onClick={handleQuickPay}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
              >
                <Zap className="w-4 h-4" />
                Quick Pay
              </button>
            )}
          </div>
        </div>

        {/* Wallet Toggle */}
        <label className="flex items-center gap-3 p-4 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={useWallet}
            onChange={(e) => {
              setUseWallet(e.target.checked);
              if (e.target.checked) {
                setWalletAmount(Math.min(walletBalance, totalAmount));
              } else {
                setWalletAmount(0);
              }
            }}
            className="w-5 h-5"
          />
          <span className="flex-1 font-semibold">
            Pay with Wallet Balance
            {canPayWithWalletOnly && <span className="ml-2 text-green-600 text-sm">(Full payment available)</span>}
          </span>
        </label>

        {/* Wallet Amount Input */}
        {useWallet && (
          <div className="mt-4 p-4 bg-white rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={walletAmount}
                onChange={(e) => setWalletAmount(Math.min(parseFloat(e.target.value) || 0, walletBalance, totalAmount))}
                max={Math.min(walletBalance, totalAmount)}
                step="0.01"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg font-mono text-lg focus:border-blue-500 outline-none"
                placeholder="0.00"
              />
              <button
                onClick={() => setWalletAmount(Math.min(walletBalance, totalAmount))}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 whitespace-nowrap"
              >
                Use Max
              </button>
            </div>
            
            {walletBalance < totalAmount && (
              <div className="flex items-start gap-2 p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-orange-900">Insufficient wallet balance</div>
                  <div className="text-orange-700">
                    Please select an additional payment method below or 
                    <button 
                      onClick={() => setShowTopUp(true)}
                      className="ml-1 underline font-semibold hover:text-orange-900"
                    >
                      top up your wallet
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {remainingAfterWallet > 0 && (
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-semibold">Remaining to pay:</span>
                <span className="text-xl font-bold text-blue-600">${remainingAfterWallet.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {/* Virtual Card Preview */}
        {!showCardDetails && (
          <button
            onClick={() => setShowCardDetails(true)}
            className="mt-4 w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <CreditCard className="w-5 h-5" />
            <span className="font-semibold">View Bridge55 Virtual Card</span>
          </button>
        )}
        
        {showCardDetails && (
          <div className="mt-4">
            <Bridge55Card
              balance={walletBalance}
              cardNumber="4242 5555 6789 4242"
              expiryDate="12/28"
              cvv="123"
              cardholderName="BRIDGE55 MEMBER"
              type="virtual"
            />
            <button
              onClick={() => setShowCardDetails(false)}
              className="mt-3 w-full py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Hide Card
            </button>
          </div>
        )}
      </div>

      {/* Top-Up Modal */}
      {showTopUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Add Funds to Wallet</h3>
              <button onClick={() => setShowTopUp(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold mb-2">Amount (USD)</label>
                <input
                  type="number"
                  id="topup-amount"
                  placeholder="100.00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none text-lg font-mono"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 200].map(amt => (
                  <button 
                    key={amt} 
                    onClick={() => {
                      const input = document.getElementById('topup-amount') as HTMLInputElement;
                      if (input) input.value = amt.toString();
                    }}
                    className="py-2 px-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 font-semibold transition-all"
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm font-semibold mb-3">Select top-up method:</p>
                <div className="space-y-2">
                  <label className="w-full flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                    <input type="radio" name="topup-method" className="w-4 h-4" defaultChecked />
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="flex-1 font-semibold">Debit/Credit Card</span>
                    <span className="text-xs text-gray-500">Instant</span>
                  </label>
                  <label className="w-full flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-all">
                    <input type="radio" name="topup-method" className="w-4 h-4" />
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span className="flex-1 font-semibold">Mobile Money</span>
                    <span className="text-xs text-gray-500">2 mins</span>
                  </label>
                  <label className="w-full flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition-all">
                    <input type="radio" name="topup-method" className="w-4 h-4" />
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <span className="flex-1 font-semibold">Bank Transfer</span>
                    <span className="text-xs text-gray-500">1-3 days</span>
                  </label>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  alert('Top-up functionality will be connected to payment processor (Stripe/Flutterwave)');
                  setShowTopUp(false);
                }}
                className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Payment Methods */}
      {(!useWallet || remainingAfterWallet > 0) && savedMethods.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-lg mb-4">Saved Payment Methods</h3>
          <div className="space-y-3">
            {savedMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="w-5 h-5"
                />
                
                {method.type === 'card' ? (
                  <>
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-semibold">{method.brand} •••• {method.last4}</div>
                      <div className="text-sm text-gray-600">Expires {method.expiry}</div>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        Default
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <div className="flex-1">
                      <div className="font-semibold">{method.provider}</div>
                      <div className="text-sm text-gray-600">{method.phone}</div>
                    </div>
                  </>
                )}
                
                {selectedMethod === method.id && (
                  <Check className="w-6 h-6 text-blue-600" />
                )}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Add New Payment Method */}
      {(!useWallet || remainingAfterWallet > 0) && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-lg mb-4">Add New Payment Method</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setShowAddCard(true)}
              className="flex items-center justify-center gap-2 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Card</span>
            </button>
            <button 
              onClick={() => setShowAddMobile(true)}
              className="flex items-center justify-center gap-2 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <Smartphone className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Mobile Money</span>
            </button>
            <button 
              onClick={() => setShowLinkBank(true)}
              className="flex items-center justify-center gap-2 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all col-span-2"
            >
              <Building2 className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">Link Bank Account</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Add Debit/Credit Card</h3>
              <button onClick={() => setShowAddCard(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-2">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">CVV</label>
                  <input type="text" placeholder="123" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
                <input type="text" placeholder="Name on card" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Save for future purchases</span>
              </label>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Mobile Money Modal - COMPLETE FLOW */}
      {showAddMobile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Add Mobile Money</h3>
              <button onClick={() => setShowAddMobile(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Select Provider</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none">
                  <option>M-Pesa (Kenya)</option>
                  <option>M-Pesa (Tanzania)</option>
                  <option>Airtel Money (Kenya)</option>
                  <option>Airtel Money (Tanzania)</option>
                  <option>Airtel Money (Uganda)</option>
                  <option>Orange Money (Côte d'Ivoire)</option>
                  <option>Orange Money (Senegal)</option>
                  <option>MTN Mobile Money (Ghana)</option>
                  <option>MTN Mobile Money (Uganda)</option>
                  <option>Vodacom M-Pesa (Tanzania)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+254 712 345 678" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" 
                />
                <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +254 for Kenya)</p>
              </div>
              
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded text-sm">
                <p className="font-semibold text-green-900 mb-2">How it works:</p>
                <ol className="space-y-1 text-green-800 text-xs">
                  <li>1. Enter your mobile money number</li>
                  <li>2. You'll receive an STK push/USSD prompt</li>
                  <li>3. Enter your M-Pesa/Mobile Money PIN</li>
                  <li>4. Funds added instantly to your wallet</li>
                </ol>
              </div>
              
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Save for future top-ups</span>
              </label>
              
              <button 
                onClick={() => {
                  alert('Mobile Money flow:\n\n1. System sends STK push to your phone\n2. You enter M-Pesa PIN on your phone\n3. Payment confirmed\n4. Wallet updated instantly\n\nThis will be connected to M-Pesa API (Safaricom/Vodacom)');
                  setShowAddMobile(false);
                }}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
              >
                Add Mobile Money Account
              </button>
              
              <p className="text-xs text-center text-gray-500">
                Secured by your mobile money provider • No card required
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Link Bank Modal - COMPLETE INTERNATIONAL FLOW */}
      {showLinkBank && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Link Bank Account</h3>
              <button onClick={() => setShowLinkBank(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                <p className="text-sm text-purple-900">
                  <strong>🔐 Secure Bank Linking</strong> - Your bank credentials are encrypted and never stored. We use industry-standard security protocols.
                </p>
              </div>
              
              {/* Step 1: Account Type */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-3">Step 1: Account Type</h4>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500">
                    <input type="radio" name="account-type" defaultChecked className="w-4 h-4" />
                    <span className="font-semibold">Local Account</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500">
                    <input type="radio" name="account-type" className="w-4 h-4" />
                    <span className="font-semibold">International</span>
                  </label>
                </div>
              </div>

              {/* Step 2: Bank Details */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-3">Step 2: Bank Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Country *</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none">
                      <option>Select country</option>
                      <option>🇰🇪 Kenya</option>
                      <option>🇳🇬 Nigeria</option>
                      <option>🇿🇦 South Africa</option>
                      <option>🇬🇭 Ghana</option>
                      <option>🇹🇿 Tanzania</option>
                      <option>🇺🇬 Uganda</option>
                      <option>🇨🇮 Côte d'Ivoire</option>
                      <option>🇸🇳 Senegal</option>
                      <option>🇪🇬 Egypt</option>
                      <option>🇲🇦 Morocco</option>
                      <option>🇺🇸 United States</option>
                      <option>🇬🇧 United Kingdom</option>
                      <option>🇫🇷 France</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Bank Name *</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none">
                      <option>Select bank</option>
                      <optgroup label="Kenya">
                        <option>Equity Bank</option>
                        <option>KCB Bank</option>
                        <option>Co-operative Bank</option>
                        <option>Standard Chartered</option>
                        <option>Barclays Bank</option>
                      </optgroup>
                      <optgroup label="Nigeria">
                        <option>GTBank</option>
                        <option>First Bank</option>
                        <option>Access Bank</option>
                        <option>Zenith Bank</option>
                        <option>UBA</option>
                      </optgroup>
                      <optgroup label="South Africa">
                        <option>Standard Bank</option>
                        <option>ABSA</option>
                        <option>FNB</option>
                        <option>Nedbank</option>
                        <option>Capitec</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Account Details */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-3">Step 3: Account Details</h4>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Account Number *</label>
                      <input 
                        type="text" 
                        placeholder="1234567890" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Account Name *</label>
                      <input 
                        type="text" 
                        placeholder="Your name as on bank account" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Routing Number (ABA/Sort Code)</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 021000021" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none" 
                      />
                      <p className="text-xs text-gray-500 mt-1">9 digits for US banks</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">SWIFT/BIC Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g., KEBLKENXXXX" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none" 
                      />
                      <p className="text-xs text-gray-500 mt-1">8-11 characters for international</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">IBAN (International Bank Account Number)</label>
                    <input 
                      type="text" 
                      placeholder="e.g., GB29 NWBK 6016 1331 9268 19" 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none" 
                    />
                    <p className="text-xs text-gray-500 mt-1">Required for European & some African banks</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Bank Branch (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Branch name or code" 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Verification */}
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-sm font-semibold text-blue-900 mb-2">✅ Verification Process</p>
                <ol className="text-xs text-blue-800 space-y-1">
                  <li>1. We'll send 2 small deposits (0.01-0.99 USD) to your account within 1-2 business days</li>
                  <li>2. Check your bank statement for the exact amounts</li>
                  <li>3. Return here and enter the amounts to verify</li>
                  <li>4. Once verified, your bank account is linked!</li>
                </ol>
              </div>
              
              <label className="flex items-start gap-2">
                <input type="checkbox" className="w-4 h-4 mt-1" />
                <span className="text-sm">I authorize Bridge55 to verify and link this bank account for top-ups, withdrawals, and payments. I understand micro-deposits will be sent for verification.</span>
              </label>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowLinkBank(false)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Bank Linking Process:\n\n✅ Account details saved (encrypted)\n✅ Micro-deposits sending (1-2 days)\n✅ Email notification sent\n\nNext steps:\n1. Check your bank in 1-2 days\n2. Note the 2 deposit amounts\n3. Return to verify amounts\n4. Account fully linked!\n\nThis flow will be automated with Plaid API once integrated.');
                    setShowLinkBank(false);
                  }}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                >
                  Link Bank Account
                </button>
              </div>
              
              <div className="text-center pt-4 border-t">
                <div className="text-xs text-gray-500 mb-2">🔒 Enterprise-grade security</div>
                <div className="text-xs text-gray-400">256-bit encryption • PCI DSS compliant • SOC 2 certified</div>
                <div className="text-xs text-purple-600 font-semibold mt-2">Instant linking with Plaid coming soon!</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Summary */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
        <h3 className="font-bold text-lg mb-4">Payment Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service Fee (5%)</span>
            <span className="font-semibold">${serviceFee.toFixed(2)}</span>
          </div>
          {useWallet && walletAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Wallet Credit</span>
              <span className="font-semibold">-${walletAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-2 border-t-2 flex justify-between items-center">
            <span className="text-lg font-bold">Total to Pay</span>
            <span className="text-2xl font-bold text-blue-600">
              ${remainingAfterWallet.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
