export const validateRegister = (req, res, next) => {
  const { name, username, email, password } = req.body; // Data  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex  

  if (!name || name.length < 3) {
    return res.status(400).json({ message: "Name must be at least 3 characters" }); // Name  
  }

  if (!username || username.length < 3) {
    return res.status(400).json({ message: "Username must be at least 3 characters" }); // Username  
  }

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" }); // Email  
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" }); // Password  
  }

  next(); // Next  
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body; // Data  

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" }); // Required  
  }

  next(); // Next  
};
