# Therapeia AI - FREE AI Integration Setup

## 🤖 Hugging Face Integration (FREE!)

Your Therapeia chatbot now supports real AI conversations using FREE Hugging Face models! No API key required for basic functionality.

### 1. Quick Start (No Setup Required!)

🎉 **Good news**: The chatbot works immediately with free models!

- **No API key needed** for basic functionality
- **Multiple free models** automatically available
- **Instant setup** - just start chatting!

### 2. Optional: Enhanced Models (Free API Key)

For access to premium models, get a free Hugging Face API key:

1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up for a free account
3. Go to Settings → Access Tokens
4. Create a new token (free tier available)
5. Add to your `.env.local` file

### 3. Environment Configuration (Optional)

Create a `.env.local` file for enhanced functionality:

```env
# Optional: Hugging Face API Key (free tier available)
HUGGINGFACE_API_KEY=hf_your-free-api-key-here

# Optional: Preferred Model (defaults to microsoft/DialoGPT-large)
HUGGINGFACE_MODEL=microsoft/DialoGPT-large
```

### 4. Available Models

#### 🆓 Free Models (No API Key Required)

- `microsoft/DialoGPT-large` - **Default** conversational AI
- `facebook/blenderbot-400M-distill` - Facebook's conversational AI
- `microsoft/DialoGPT-medium` - Smaller, faster version
- `gpt2` - Classic GPT-2 model
- `distilgpt2` - Lightweight GPT-2

#### ⭐ Premium Models (Free API Key Required)

- `meta-llama/Llama-2-7b-chat-hf` - Meta's Llama 2 Chat
- `mistralai/Mistral-7B-Instruct-v0.1` - Mistral Instruct
- `HuggingFaceH4/zephyr-7b-beta` - Zephyr Chat Model

### 5. How It Works

The system has **automatic fallback layers**:

1. **Primary**: Hugging Face API route (`/api/huggingface`)
2. **Fallback**: Direct Hugging Face client calls
3. **Final Fallback**: Therapeutic mock responses

### 6. Key Benefits

✅ **Completely FREE** - No costs for basic usage  
✅ **No API key required** - Works out of the box  
✅ **Multiple models** - Automatic fallback between models  
✅ **Therapeutic focus** - Specialized mental health prompting  
✅ **Crisis detection** - Automatic safety protocols  
✅ **Privacy focused** - No data stored by Hugging Face  
✅ **Open source models** - Transparent AI systems

### 7. Model Performance

**Best for conversations**: `microsoft/DialoGPT-large`

- Excellent dialogue quality
- Good context understanding
- Mental health appropriate responses

**Fastest**: `distilgpt2`

- Quick responses
- Lower quality but reliable
- Good for high-traffic scenarios

**Most advanced** (requires API key): `meta-llama/Llama-2-7b-chat-hf`

- State-of-the-art performance
- Excellent instruction following
- Best therapeutic responses

### 8. Cost Comparison

| Service                 | Cost              | Setup        | Quality   |
| ----------------------- | ----------------- | ------------ | --------- |
| **Hugging Face (Free)** | $0.00             | None         | Good      |
| Hugging Face (Premium)  | $0.00             | Free account | Excellent |
| OpenAI GPT-3.5          | ~$0.002/1K tokens | Paid account | Excellent |
| OpenAI GPT-4            | ~$0.03/1K tokens  | Paid account | Best      |

### 9. Testing the Integration

1. **Start the app**: `npm run dev`
2. **Visit**: `/therapy/chat`
3. **Look for**: "Hugging Face AI (FREE)" badge in chat header
4. **Start chatting**: No setup required!

### 10. Troubleshooting

**"Model failed" messages in console**

- Normal behavior - system tries multiple models
- First available model will respond
- No user impact

**Slow responses**

- Free models may have queuing
- System automatically tries faster models
- Consider upgrading to premium models with API key

**No responses**

- Check internet connection
- System will fall back to therapeutic mock responses
- All models rarely fail simultaneously

### 11. Advanced Configuration

#### Custom Model Selection

```env
# Use a specific model
HUGGINGFACE_MODEL=facebook/blenderbot-400M-distill

# The system will still fall back to other models if this fails
```

#### Development vs Production

**Development** (Local):

```env
# No configuration needed - works immediately!
```

**Production** (Deployed):

```env
# Optional: Add API key for premium models
HUGGINGFACE_API_KEY=hf_your-production-key
HUGGINGFACE_MODEL=meta-llama/Llama-2-7b-chat-hf
```

---

## 🚀 Quick Start Summary

1. ✅ **Already working!** - No setup required
2. 🔧 **Optional**: Add free Hugging Face API key for premium models
3. 🚀 **Start chatting**: Visit `/therapy/chat`
4. 🎯 **Look for**: "Hugging Face AI (FREE)" indicator

The system automatically uses the best available model and provides real AI conversations completely free!
