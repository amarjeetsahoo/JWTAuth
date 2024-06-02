namespace API.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = String.Empty;
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
    }
}
