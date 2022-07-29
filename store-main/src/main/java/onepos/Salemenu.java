package onepos;

import javax.persistence.*;

@Entity
@Table(name="store_salemenu")
public class Salemenu {
    @Id @GeneratedValue
    Long id;
    String name;
    String amt ;

    public String getAmt() {
        return amt;
    }
    public void setAmt(String amt) {
        this.amt = amt;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

}
