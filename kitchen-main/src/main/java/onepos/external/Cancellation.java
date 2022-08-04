package onepos.external;

import lombok.Data;

@Data
public class Cancellation {

    private int id;
    private int orderId;
    private String status;

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

}
