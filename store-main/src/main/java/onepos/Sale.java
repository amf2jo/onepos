package onepos;

import java.util.List;

import javax.persistence.*;



@Entity
@Table(name="store_sale")
public class Sale {

    @Id @GeneratedValue
    int saleId ;
    int orderNumber ;
    int storeId ;
    String storeName;
    String saleDtm ;








    @Embedded  // 1:1
    SalemenuId oneMenu;

        public SalemenuId getOneMenu() {
            return oneMenu;
        }

        public void setOneMenu(SalemenuId oneMenu) {
            this.oneMenu = oneMenu;
        }

    @ElementCollection // 1:n
    List<SalemenuId> menuIds;


        public List<SalemenuId> getMenuIds() {
                return menuIds;
        }

        public void setMenuIds(List<SalemenuId> menuIds) {
                this.menuIds = menuIds;
        }








    public int getSaleId() {
        return saleId;
    }
    public void setSaleId(int saleId) {
        this.saleId = saleId;
    }

    public int getOrderNumber() {
        return orderNumber;
    }
    public void setOrderNumber(int orderNumber) {
        this.orderNumber = orderNumber;
    }

    public int getStoreId() {
        return storeId;
    }
    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }
    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getSaleDtm() {
        return saleDtm;
    }
    public void setSaleDtm(String saleDtm) {
        this.saleDtm = saleDtm;
    }






}
