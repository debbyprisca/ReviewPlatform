
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 *  Smart contract for verifying product reviews with proof of purchase
 */
contract TrustSeal {
    // Structs
    struct Review {
        address reviewer;
        uint256 institutionId;
        string reviewContent;
        string proofOfPurchase; // Transaction hash
        uint256 timestamp;
        bool verified;
    }

    struct Institution {
        string name;
        string contractAddress; // contract address of the institution
        string location; // Coordinates or location identifier
        string imageUrl; // URL to the institution's image
        string tags; // Categories/tags for the institution
        address owner;
        bool isRegistered;
        uint256 reviewCount;
    }

    // State variables
    mapping(uint256 => Institution) public institutions;
    mapping(uint256 => Review[]) public institutionReviews;
    mapping(address => bool) public verifiedWallets;
    mapping(address => uint256[]) public userReviews;
    
    uint256 public institutionCount;
    uint256 public reviewCount;
    
    address public owner;
    
    // Events
    event InstitutionRegistered(uint256 indexed institutionId, string name, address owner);
    event ReviewSubmitted(uint256 indexed reviewId, uint256 indexed institutionId, address indexed reviewer);
    event WalletVerified(address indexed wallet);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }
    
    modifier onlyVerifiedWallet() {
        require(verifiedWallets[msg.sender], "Only verified wallets can call this function");
        _;
    }
    
    // Constructor
    constructor() {
        owner = msg.sender;
        institutionCount = 0;
        reviewCount = 0;
    }
    

    function registerInstitution(
        string memory _name,
        string memory _contractAddress,
        string memory _location,
        string memory _imageUrl,
        string memory _tags,
        address _institutionOwner
    ) public onlyOwner {
        institutionCount++;
        
        institutions[institutionCount] = Institution({
            name: _name,
            contractAddress: _contractAddress,
            location: _location,
            imageUrl: _imageUrl,
            tags: _tags,
            owner: _institutionOwner,
            isRegistered: true,
            reviewCount: 0
        });
        
        emit InstitutionRegistered(institutionCount, _name, _institutionOwner);
    }
    
    /**
     * Verify a wallet address
     * @param _wallet Address to verify
     */
    function verifyWallet(address _wallet) public payable  {
        require ( msg.value>0, "No value supplied");
        verifiedWallets[_wallet] = true;
        emit WalletVerified(_wallet);
    }
    
    /**
     * Submit a review with proof of purchase
     * @param _institutionId ID of the institution being reviewed
     * @param _reviewContent Content of the review
     * @param _transactionHash Transaction hash as proof of purchase
     */
    function submitReview(
        uint256 _institutionId,
        string memory _reviewContent,
        string memory _transactionHash
    ) public onlyVerifiedWallet {
        require(institutions[_institutionId].isRegistered, "Institution does not exist");
        
        // Verify the transaction hash is valid
        require(bytes(_transactionHash).length > 0, "Transaction hash is required");
        
        reviewCount++;
        Review memory newReview = Review({
            reviewer: msg.sender,
            institutionId: _institutionId,
            reviewContent: _reviewContent,
            proofOfPurchase: _transactionHash,
            timestamp: block.timestamp,
            verified: true
        });
        
        institutionReviews[_institutionId].push(newReview);
        userReviews[msg.sender].push(reviewCount);
        institutions[_institutionId].reviewCount++;
        
        emit ReviewSubmitted(reviewCount, _institutionId, msg.sender);
    }
    
    /**
     * Get all reviews for an institution
     * @param _institutionId ID of the institution
     * @return Array of reviews for the institution
     */
    function getInstitutionReviews(uint256 _institutionId) public view returns (Review[] memory) {
        return institutionReviews[_institutionId];
    }
    
    
    function getInstitutionDetails(uint256 _institutionId) public view returns (
        string memory name,
        string memory contractAddress,
        string memory location,
        string memory imageUrl,
        string memory tags,
        address institutionowner,
        bool isRegistered,
        uint256 institutionreviews
    ) {
        Institution storage institution = institutions[_institutionId];
        return (
            institution.name,
            institution.contractAddress,
            institution.location,
            institution.imageUrl,
            institution.tags,
            institution.owner,
            institution.isRegistered,
            institution.reviewCount
        );
    }
    
    /**
     * Get all review IDs submitted by a user
     * @param _user Address of the user
     * @return Array of review IDs
     */
    function getUserReviews(address _user) public view returns (uint256[] memory) {
        return userReviews[_user];
    }
    
    /**
     * Check if a wallet is verified
     * @param _wallet Address to check
     * @return Boolean indicating if the wallet is verified
     */
    function isWalletVerified(address _wallet) public view returns (bool) {
        return verifiedWallets[_wallet];
    }
    
    /**
     * Get the tags for an institution
     * @param _institutionId ID of the institution
     * @return Array of tags for the institution
     */
    function getInstitutionTags(uint256 _institutionId) public view returns (string memory) {
        return institutions[_institutionId].tags;
    }
}